import { Field, InputType } from "@nestjs/graphql";
import { QuestionType } from "src/graphql/models/question";


@InputType()
export class CreateQuestionData{
    @Field()
    question_text: string

    @Field(type => QuestionType)
    type: QuestionType

    @Field(type => [String])
    correct_answers: [String]

    @Field(type => [String])
    answer_propositions: [String]
}