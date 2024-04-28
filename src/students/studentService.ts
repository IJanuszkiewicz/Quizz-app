import { Injectable, Module } from "@nestjs/common";
import{ InjectRepository } from '@nestjs/typeorm'
import { Student } from "src/graphql/models/student";
import { Repository } from "typeorm";

@Injectable()
export class StudentService{
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) {}

    addStudent(){
        return this.studentRepository.create({
            name: "john",
            surname: "doe",
            display_name: "jd"
        })
    }
}