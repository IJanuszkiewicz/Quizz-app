import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentResolver } from './students/studentResolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './graphql/models/student';
import { StudentModule } from './students/students.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 9000,
      username: 'postgres',
      password: 'mysecredpassword',
      database: 'postgres',
      entities: [Student],
      synchronize: true,
    }),
    StudentModule
  ],
  controllers: [],
  providers: [StudentResolver],
})
export class AppModule {}
