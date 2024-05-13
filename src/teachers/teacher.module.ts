import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/graphql/models/teacher";
import { TeacherService } from "./teacherService";
import { TeacherResolver } from "./teacherResolver";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [
        TeacherService,
        TeacherResolver,
    ]
})
export class TeacherModule {}