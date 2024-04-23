import { ObjectType, Field, Int, registerEnumType} from "@nestjs/graphql";

export enum QuestionType {
    SINGLE_CHOICE,
    MULTIPLE_CHOICE,
    SORTING,
    PLAIN_TEXT
}

registerEnumType(QuestionType, {
    name: 'QuestionType',
});

@ObjectType()
export class Question{
    @Field((type) => Int)
    id: number;

    @Field((type) => Int)
    set_id: number;

    @Field()
    question_text: string;

    @Field((type) => QuestionType)
    type: QuestionType;
}