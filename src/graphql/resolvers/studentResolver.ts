import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Student } from "../models/student";
import { users } from 'src/__mocks__/users';

@Resolver()
export class StudentResolver{
    @Query((returns) => [Student])
    getStudent() {
        return users;
    }

    @Mutation((returns) => Student)
    newStudent(
        @Args('name') name: string, 
        @Args('surname') surname: string, 
        @Args('displayName', {nullable: true}) displayName: string
    
    ){
        const student: Student ={
            id: 4,
            name: name,
            surname: surname,
            display_name: displayName
        } 
        users.push(student);
    }

}
