import { Mutation, Resolver, Args, Query } from "@nestjs/graphql";
import { TestSetService } from "./testSet.service";
import { CreateTestSetData } from "src/utils/createTestSetData";
import { TestSet } from "src/graphql/models/testSet";

@Resolver()
export class TestSetResolver{
    constructor(
        private testSetService: TestSetService
    ){}

    @Query((returns) => [TestSet])
    async getTestSets(){
        return this.testSetService.getTestSets()
    }

    @Mutation(returns => TestSet)
    newTestSet(@Args('newTestSetData') createTestSetData: CreateTestSetData){
        return this.testSetService.newTestSet(createTestSetData)
    }
}