import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";
import { Question } from "src/graphql/models/question";
import { CreateQuestionData } from "src/utils/createQuestionData";
import { Repository } from "typeorm";

@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(CorrectAnswer) private correctAnswerRepository: Repository<CorrectAnswer>
    ) {}

    addQuestion(createQuestionData: CreateQuestionData){
    }

    addPlainTextQuestion(createQuestionData: CreateQuestionData){
        //TODO: finish
    }
}