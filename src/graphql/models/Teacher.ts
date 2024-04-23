import { ObjectType, Field, Int} from "@nestjs/graphql";

@ObjectType()
export class Teacher{
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  surname: string;

  @Field({nullable: true})
  display_name?: string;
}