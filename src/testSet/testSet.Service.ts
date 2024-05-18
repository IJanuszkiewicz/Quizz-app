import { Injectable, Module } from "@nestjs/common";
import{ InjectRepository } from '@nestjs/typeorm'
import { Question } from "src/graphql/models/question";
import { TestSet } from "src/graphql/models/testSet";
import { QuestionService } from "src/questions/question.service";
import { TeacherService } from "src/teachers/teacher.service";
import { CreateQuestionData } from "src/utils/createQuestionData";
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
        return this.testSetRepository.find({
            relations:{
                questions: {
                    correct_answers: true
                }
        }});
    }
    
    async newTestSet(createTestSetData: CreateTestSetData){
        const set = this.testSetRepository.create(createTestSetData);
        set.teacher = await this.teacherService.getTeacherById(createTestSetData.teacher_id)

        const questions: Question[] = createTestSetData.questions_data.map(questionData =>{
            const question: Question = this.questionService.createQuestion(questionData, set)
            return question
        })
        set.questions = questions
        return await this.testSetRepository.save(set)
    }
}