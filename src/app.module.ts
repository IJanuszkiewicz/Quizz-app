import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './students/students.module';
import { Student } from './graphql/models/student';
import { Teacher } from './graphql/models/teacher';
import { TestSet } from './graphql/models/testSet';
import { Question } from './graphql/models/question';
import { AnswerProposition } from './graphql/models/answerPropositions';
import { CorrectAnswer } from './graphql/models/correctAnswers';
import { TeacherModule } from './teachers/teacher.module';
import { TestSetModule } from './testSet/testSet.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', 
      isGlobal: true, 
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Student, Teacher, TestSet, Question, AnswerProposition, CorrectAnswer],
      synchronize: true,
    }),
    StudentModule,
    TeacherModule,
    TestSetModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
