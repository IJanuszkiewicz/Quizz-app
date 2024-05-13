import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestSet } from "src/graphql/models/testSet";
import { TestSetResolver } from "./testSet.resolver";
import { TestSetService } from "./testSet.service";
import { TeacherModule } from "src/teachers/teacher.module";
import { QuestionModule } from "src/questions/question.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TestSet]),
        TeacherModule,
        QuestionModule
    ],
    providers: [
        TestSetResolver,
        TestSetService,
    ]
})
export class TestSetModule {}