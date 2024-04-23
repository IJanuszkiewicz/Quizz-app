import { Field, ObjectType, Int } from "@nestjs/graphql";


@ObjectType()
export class AnswerProposition{
    @Field((type) => Int)
    id: number;

    @Field((type) => Int)
    question_id: number;

    @Field()
    letter: string;

    @Field()
    proposition: string;

}