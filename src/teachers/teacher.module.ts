import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "src/graphql/models/teacher";

@Module({
    imports: [TypeOrmModule.forFeature([Teacher])],
    providers: [

    ]
})
export class TeacherModule {}