import { Mutation, Resolver, Args, Query } from "@nestjs/graphql";
import { TestSetService } from "./testSet.service";
import { CreateTestSetData } from "src/utils/createTestSetData";
import { TestSet } from "src/graphql/models/testSet";
import { AnswersToSubmit } from "src/graphql/models/answersToSubmit";
import { Result } from "src/graphql/models/result";

@Resolver()
export class TestSetResolver{
    constructor(
        private testSetService: TestSetService
    ){}

    @Query((returns) => [TestSet])
    getTestSets(){
        return this.testSetService.getTestSets()
    }

    @Query(returns => [TestSet])
    getTestSetQuestions(@Args('testId') testId: number){
        return this.testSetService.getQuestionsForTest(testId)
    }

    @Mutation(returns => TestSet)
    newTestSet(@Args('newTestSetData') createTestSetData: CreateTestSetData){
        return this.testSetService.newTestSet(createTestSetData)
    }

    @Query(returns => Result)
    getResult(@Args('answersToSubmit') answersToSubmit: AnswersToSubmit){
        return this.testSetService.getResult(answersToSubmit)
    }
}