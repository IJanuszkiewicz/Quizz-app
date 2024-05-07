import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { Question } from "./question";



@Entity({name: 'correct_answers'})
@ObjectType()
export class CorrectAnswer{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    answer: string;

    @ManyToOne(() => Question, (question) => question.correct_answers)
    question: Question
}