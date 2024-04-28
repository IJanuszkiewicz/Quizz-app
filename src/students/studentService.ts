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
        const user = this.studentRepository.create({
            name: student.name,
            surname: student.surname,
            display_name: student.display_name
        })
        return this.studentRepository.save(user)
    }

    getAllStudents(){
        return this.studentRepository.find()
    }
}