import { ObjectType, Field, Int, registerEnumType} from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSet } from "./testSet";
import { CorrectAnswer } from "./correctAnswers";
import { AnswerProposition } from "./answerPorpositions";

export enum QuestionType {
    SINGLE_CHOICE,
    MULTIPLE_CHOICE,
    SORTING,
    PLAIN_TEXT
}

registerEnumType(QuestionType, {
    name: 'QuestionType',
});

@Entity({name: 'questions'})
@ObjectType()
export class Question{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number

    @Column()
    @Field()
    question_text: string;

    @Column({
        type: 'enum',
        enum: QuestionType,
    })
    @Field((type) => QuestionType)
    type: QuestionType;

    @ManyToOne(() => TestSet, (testSet) => testSet.questions)
    test_set: TestSet

    @OneToMany(() => CorrectAnswer, (correctAnswer) => correctAnswer.question)
    correct_answers: CorrectAnswer[]

    @OneToMany(() => AnswerProposition, (answerProposition) => answerProposition.question)
    answer_propositions: AnswerProposition[]
}