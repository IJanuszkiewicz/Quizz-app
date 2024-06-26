import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/graphql/models/student";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    providers: [
        StudentResolver,
        StudentService,
    ]
})
export class StudentModule {}
