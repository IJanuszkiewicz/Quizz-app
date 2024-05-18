import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/graphql/models/question";
import { QuestionService } from "./question.service";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";


@Module({
    imports: [
        TypeOrmModule.forFeature([Question, CorrectAnswer]),

    ],
    exports: [
        QuestionService
    ],
    providers: [
        QuestionService

    ],
})
export class QuestionModule {}