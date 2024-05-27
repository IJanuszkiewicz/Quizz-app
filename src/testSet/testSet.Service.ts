import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm'
import { AnswersToSubmit } from "src/graphql/models/answersToSubmit";
import { Result } from "src/graphql/models/result";
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
                    correct_answers: true,
                    answer_propositions: true
                }
            }
        });
    }

    async getResult(answers: AnswersToSubmit){
        if(answers.answers.length != answers.question_ids.length){
            throw new BadRequestException("Number of questions doesn't match number of answers")
        }
        const max = answers.question_ids.length
        let obtained = 0
        for(let i = 0; i < answers.answers.length; i++){
            if( await this.questionService.checkAnswer(answers.question_ids[i], answers.answers[i])){
                obtained += 1
            }
        }
        return new Result(max, obtained)
    }

    async getQuestionsForTest(testSetId: number){
        return (await this.testSetRepository.find({
            select:{
                name: true,
                teacher: {
                    name: true,
                    surname: true,
                    display_name: true
                },
                questions:{
                    question_text: true,
                    answer_propositions:{
                        character: true,
                        proposition: true
                    },
                    type: true,
                    id: true
                    
                }
            },
            where:{
                id: testSetId
            },
            relations: {
                teacher: true,
                questions: {
                    answer_propositions: true
                }
            }
        }))[0]
        
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