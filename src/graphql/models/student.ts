import { ObjectType, Field, Int} from "@nestjs/graphql";

@ObjectType()
export class Student{
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    surname: string;

    @Field({nullable: true})
    display_name?: string;
}