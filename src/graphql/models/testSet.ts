import { ObjectType, Field, Int} from "@nestjs/graphql";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher";
import { Question } from "./question";

@Entity({name: 'test_sets'})
@ObjectType()
export class TestSet{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @ManyToOne(() => Teacher, (teacher) => teacher.test_sets)
    teacher: Teacher;

    @OneToMany(() => Question, (question) => question.test_set)
    questions: Question[]
}