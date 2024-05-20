import { InputType, Int, Field } from "@nestjs/graphql";
import { CreateQuestionData } from "./createQuestionData";

@InputType()
export class CreateTestSetData{
    @Field((type) => Int)
    teacher_id: number

    @Field()
    name: string

    @Field((type) => [CreateQuestionData])
    questions_data: CreateQuestionData[]
}