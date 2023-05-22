import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {FacultiesModule} from './faculties/faculties.module';
import {FieldsModule} from './fields/fields.module';
import {GradesModule} from './grades/grades.module';
import {StudientsModule} from './studients/studients.module';
import {PromotionsModule} from './promotions/promotions.module';
import {CoursesModule} from './courses/courses.module';
import {RolesModule} from './roles/roles.module';
import {PeriodsModule} from './periods/periods.module';
import {SessionsModule} from './sessions/sessions.module';
import {ReportsModule} from './reports/reports.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        FacultiesModule,
        FieldsModule,
        GradesModule,
        StudientsModule,
        PromotionsModule,
        CoursesModule,
        RolesModule,
        PeriodsModule,
        SessionsModule,
        ReportsModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: configService.get('DB_TYPE') as any,
                host: configService.get('DB_HOST') as string,
                port: parseInt(configService.get('DB_PORT')) as number,
                username: configService.get('DB_USER') as string,
                password: configService.get('DB_PASS') as string,
                database: configService.get('DB_NAME') as string,
                entities: ['dist/**/**/*.entity{.ts,.js}'],
                synchronize: true,
            })
        })
    ],
})

export class AppModule {
}
