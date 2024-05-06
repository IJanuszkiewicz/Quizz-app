import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "src/graphql/models/teacher";
import { Repository } from "typeorm";

@Injectable()
export class TeacherService{
    constructor(
        @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>
    ) {}


}