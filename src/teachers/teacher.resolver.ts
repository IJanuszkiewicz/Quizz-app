import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Teacher } from "src/graphql/models/teacher";
import { TeacherService } from "./teacher.service";

@Resolver()
export class TeacherResolver{
    constructor(
        private teacherService: TeacherService
    ){}

    @Query((returns) => [Teacher])
    getTeachers(){
        return this.teacherService.getAllTeachers();
    }

    @Mutation((returns) => Teacher)
    newTeacher(
        @Args('name') name: string, 
        @Args('surname') surname: string, 
        @Args('displayName', {nullable: true}) displayName: string
    
    ){
        const teacher: Teacher= new Teacher()
        teacher.name = name
        teacher.surname = surname
        teacher.display_name = displayName
        return this.teacherService.addTeacher(teacher)
    }

}