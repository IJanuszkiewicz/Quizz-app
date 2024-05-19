import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/graphql/models/question";
import { QuestionService } from "./question.service";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";
import { AnswerProposition } from "src/graphql/models/answerPropositions";


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Question, 
            CorrectAnswer, 
            AnswerProposition
        ]),

    ],
    exports: [
        QuestionService
    ],
    providers: [
        QuestionService

    ],
})
export class QuestionModule {}