import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Student } from "../graphql/models/student";
import { users } from 'src/__mocks__/users';
import { StudentService } from "./studentService";

export let id_counter: number = 2;

@Resolver()
export class StudentResolver{
    constructor(
        private studentService: StudentService
    ){}

    @Query((returns) => [Student])
    getStudents() {
        return this.studentService.getAllStudents();
    }

    @Mutation((returns) => Student)
    newStudent(
        @Args('name') name: string, 
        @Args('surname') surname: string, 
        @Args('displayName', {nullable: true}) displayName: string
    
    ){
        const student: Student = {
            id: ++id_counter,
            name: name,
            surname: surname,
            display_name: displayName
        }
        this.studentService.addStudent(student)
        return student
    }

}
