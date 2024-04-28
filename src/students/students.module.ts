import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/graphql/models/student";
import { StudentResolver } from "./studentResolver";
import { StudentService } from "./studentService";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [
        StudentResolver,
        StudentService,
    ]
})
export class StudentModule {}
