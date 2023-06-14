import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FacultiesModule } from './faculties/faculties.module';
import { FieldsModule } from './fields/fields.module';
import { GradesModule } from './grades/grades.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DeliberationModule } from './deliberation/deliberation.module';
import { PdfModule } from './pdf/pdf.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    FacultiesModule,
    FieldsModule,
    GradesModule,
    StudentsModule,
    CoursesModule,
    RolesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DeliberationModule,
    PdfModule,
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          transport: {
            host: config.get('MAIL_HOST'),
            port: config.get('MAIL_PORT'),
            secure: false,
            auth: {
              user: config.get('MAIL_USER'),
              pass: config.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: config.get('MAIL_FROM'),
          },
        };
      },
    }),
  ],
})
export class AppModule {}
