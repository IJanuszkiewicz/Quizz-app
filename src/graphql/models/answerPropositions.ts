import { Field, ObjectType, Int } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question";


@Entity({name: 'answer_propositions'})
@ObjectType()
export class AnswerProposition{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    character: string;

    @Column()
    @Field()
    proposition: string;

    @ManyToOne(() => Question, (question) => question.answer_propositions)
    question: Question
}