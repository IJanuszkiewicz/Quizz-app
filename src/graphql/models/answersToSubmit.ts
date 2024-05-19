import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class AnswersToSubmit{
    @Field(type => [Int])
    question_ids: number[]

    @Field(type => [String])
    answers: string[]
}