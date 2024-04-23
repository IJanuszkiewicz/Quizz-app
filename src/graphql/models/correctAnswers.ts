import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class CorrectAnswer{
    @Field((type) => Int)
    id: number;

    @Field((type) => Int)
    question_id: number;

    @Field()
    answer: string;
}