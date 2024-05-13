import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/graphql/models/teacher";
import { TeacherService } from "./teacher.service";
import { TeacherResolver } from "./teacher.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [
        TeacherService,
        TeacherResolver,
    ],
    exports: [
        TeacherService
    ]

})
export class TeacherModule {}