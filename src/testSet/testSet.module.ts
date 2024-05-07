import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestSet } from "src/graphql/models/testSet";

@Module({
    imports: [TypeOrmModule.forFeature([TestSet])],
    providers: [

    ]
})
export class TeacherModule {}