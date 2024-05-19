import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Result{
    @Field(type => Int)
    max_points: number

    @Field(type => Int)
    obtained_points: number
}