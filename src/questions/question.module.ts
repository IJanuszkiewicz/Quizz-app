import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Question } from "src/graphql/models/question";
import { QuestionService } from "./question.service";


@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    exports: [
        QuestionService
    ],
    providers: [
        QuestionService
    ],
})
export class QuestionModule {}