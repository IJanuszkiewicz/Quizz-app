import { Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswerProposition } from "src/graphql/models/answerPropositions";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";
import { Question, QuestionType } from "src/graphql/models/question";
import { TestSet } from "src/graphql/models/testSet";
import { CreateQuestionData } from "src/utils/createQuestionData";
import { Repository } from "typeorm";

@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(CorrectAnswer) private correctAnswerRepository: Repository<CorrectAnswer>,
        @InjectRepository(AnswerProposition) private answerPropositionRepository: Repository<AnswerProposition>
    ) {}

    private Types2Functions: {[key in QuestionType]: (questionData: CreateQuestionData, testSet: TestSet) => Question} = {
        [QuestionType.PLAIN_TEXT]: (questionData: CreateQuestionData, testSet: TestSet) => this.createPlainTextQuestion(questionData, testSet),
        [QuestionType.MULTIPLE_CHOICE]: (questionData: CreateQuestionData, testSet: TestSet) => {throw new NotImplementedException()},
        [QuestionType.SINGLE_CHOICE]: (questionData: CreateQuestionData, testSet: TestSet) => {throw new NotImplementedException()},
        [QuestionType.SORTING]: (questionData: CreateQuestionData, testSet: TestSet) => {throw new NotImplementedException()},
    }

    createQuestion(createQuestionData: CreateQuestionData, testSet: TestSet): Question{
        const question: Question = this.Types2Functions[createQuestionData.type](createQuestionData, testSet);
        return question
    }

    createPlainTextQuestion(createQuestionData: CreateQuestionData, testSet: TestSet): Question{
        const question = this.questionRepository.create({
            question_text: createQuestionData.question_text,
            type: createQuestionData.type,
        })
        const answers: CorrectAnswer[] = createQuestionData.correct_answers.map(ans => {
            const correct_answer: CorrectAnswer = this.correctAnswerRepository.create({
                answer: ans,
            })
            correct_answer.question = question
            return correct_answer
        })
        question.correct_answers = answers
        question.test_set = testSet
        return question
    }

}