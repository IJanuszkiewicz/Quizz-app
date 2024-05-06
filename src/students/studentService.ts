import { Injectable, Module } from "@nestjs/common";
import{ InjectRepository } from '@nestjs/typeorm'
import { Student } from "src/graphql/models/student";
import { Repository } from "typeorm";

@Injectable()
export class StudentService{
    constructor(
        @InjectRepository(Student) private studentRepository: Repository<Student>
    ) {}

    addStudent(student: Student){
        return this.studentRepository.save(student)
    }

    getAllStudents(){
        return this.studentRepository.find()
    }
}