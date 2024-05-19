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

    @Field(type => Teacher)
    @ManyToOne(() => Teacher, (teacher) => teacher.test_sets)
    teacher: Teacher;

    @Field(type => [Question])
    @OneToMany(() => Question, (question) => question.test_set, {cascade: true})
    questions: Question[]
}