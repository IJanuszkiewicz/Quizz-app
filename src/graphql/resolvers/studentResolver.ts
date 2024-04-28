import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Student } from "../models/student";
import { users } from 'src/__mocks__/users';

export let id_counter: number = 2;

@Resolver()
export class StudentResolver{
    @Query((returns) => [Student])
    getStudents() {
        return users;
    }

    @Mutation((returns) => Student)
    newStudent(
        @Args('name') name: string, 
        @Args('surname') surname: string, 
        @Args('displayName', {nullable: true}) displayName: string
    
    ){
        const student: Student ={
            id: ++id_counter,
            name: name,
            surname: surname,
            display_name: displayName
        } 
        users.push(student);
        return student
    }

}
