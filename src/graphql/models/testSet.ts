import { ObjectType, Field, Int} from "@nestjs/graphql";

@ObjectType()
export class TestSet{
    @Field((type) => Int)
    id: number;

    @Field()
    name: string;

    @Field((type) => Int)
    teacher_id: number;
}