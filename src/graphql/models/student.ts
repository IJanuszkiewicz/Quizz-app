import { ObjectType, Field, Int} from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'students'})
@ObjectType()
export class Student{
    @PrimaryGeneratedColumn()
    @Field((type) => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    surname: string;

    @Column({nullable: true})
    @Field({nullable: true})
    display_name?: string;
}