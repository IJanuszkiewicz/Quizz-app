import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Result{
    @Field(type => Int)
    max_points: number

    @Field(type => Int)
    obtained_points: number

    constructor(max: number, obtained: number){
        this.max_points = max
        this.obtained_points = obtained
    }
}