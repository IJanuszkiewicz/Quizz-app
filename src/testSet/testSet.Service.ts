import { Injectable, Module } from "@nestjs/common";
import{ InjectRepository } from '@nestjs/typeorm'
import { TestSet } from "src/graphql/models/testSet";
import { QuestionService } from "src/questions/question.service";
import { TeacherService } from "src/teachers/teacher.service";
import { CreateTestSetData } from "src/utils/createTestSetData";
import { Repository } from "typeorm";

@Injectable()
export class TestSetService{
    constructor(
        @InjectRepository(TestSet) private testSetRepository: Repository<TestSet>,
        private teacherService: TeacherService,
        private questionService: QuestionService
    ) {}

    getTestSets(){
        return this.testSetRepository.find();
    }
    
    async newTestSet(createTestSetData: CreateTestSetData){
        const set = this.testSetRepository.create(createTestSetData);
        set.teacher = await this.teacherService.getTeacherById(createTestSetData.teacher_id)

        return await this.testSetRepository.save(set);
    }
}