import { ObjectType, Field, Int} from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher";

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
}