import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { Student } from "../graphql/models/student";
import { StudentService } from "./studentService";


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
        const student: Student = new Student()
        student.name = name
        student.surname = surname
        student.display_name = displayName
        return this.studentService.addStudent(student)
    }

}
