import { ObjectType, Field, Int} from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TestSet } from "./testSet";

@Entity({name: 'teachers'})
@ObjectType()
export class Teacher{
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

  @OneToMany(() => TestSet, (testSet) => testSet.teacher)
  test_sets: TestSet[];
}