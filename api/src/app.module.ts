import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FacultiesModule } from './faculties/faculties.module';
import { FieldsModule } from './fields/fields.module';
import { GradesModule } from './grades/grades.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

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
  ],
})
export class AppModule {}
