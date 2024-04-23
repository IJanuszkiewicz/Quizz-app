import { Resolver, Query } from "@nestjs/graphql";
import { Student } from "../models/student";

@Resolver()
export class StudentResolver{
    @Query((returns) => Student)
    getStudent() {
        return {
            id: 1,
            name: 'igor',
            surname: 'janusz',
            display_name: 'igor123'
        }
    }
}