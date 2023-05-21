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
import { AuthModule } from './auth/auth.module';
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
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'studients-deliberation',
            entities: ["dist/**/*.entity{.ts,.js}"],
            synchronize: true,
        }),
    ]
})

export class AppModule {
}
