
import { Injectable, Module } from "@nestjs/common";
import{ InjectRepository } from '@nestjs/typeorm'
import { TestSet } from "src/graphql/models/testSet";
import { Repository } from "typeorm";

@Injectable()
export class TestSetService{
    constructor(
        @InjectRepository(TestSet) private studentRepository: Repository<TestSet>
    ) {}
    
}