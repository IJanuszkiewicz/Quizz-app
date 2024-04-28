import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentResolver } from './students/studentResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './graphql/models/student';
import { StudentModule } from './students/students.module';
import { StudentService } from './students/studentService';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'postgres',
      entities: [Student],
      synchronize: true,
    }),
    StudentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
