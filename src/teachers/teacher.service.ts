import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/graphql/models/teacher";
import { Repository } from "typeorm";

@Injectable()
export class TeacherService{
    constructor(
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>
    ) {}

    addTeacher(teacher: Teacher): Promise<Teacher> {
        return this.teacherRepository.save(teacher)
    }

    getAllTeachers(): Promise<Teacher[]> {
        return this.teacherRepository.find()
    }

    getTeacherById(id: number){
        return this.teacherRepository.findOneByOrFail({
            id: id
        })
    }

}