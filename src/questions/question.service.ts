import { BadRequestException, Injectable, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnswerProposition } from "src/graphql/models/answerPropositions";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";
import { Question, QuestionType } from "src/graphql/models/question";
import { TestSet } from "src/graphql/models/testSet";
import { CreateQuestionData } from "src/utils/createQuestionData";
import { Repository } from "typeorm";
import { randomLetters } from "src/utils/randomLetters"

@Injectable()
export class QuestionService{
    constructor(
        @InjectRepository(Question) private questionRepository: Repository<Question>,
        @InjectRepository(CorrectAnswer) private correctAnswerRepository: Repository<CorrectAnswer>,
        @InjectRepository(AnswerProposition) private answerPropositionRepository: Repository<AnswerProposition>,
    ) {}
    public static MaxAnswers: number = 26;

    private Types2Functions: {[key in QuestionType]: (questionData: CreateQuestionData, testSet: TestSet) => Question} = {
        [QuestionType.PLAIN_TEXT]: (questionData: CreateQuestionData, testSet: TestSet) => this.createPlainTextQuestion(questionData, testSet),
        [QuestionType.MULTIPLE_CHOICE]: (questionData: CreateQuestionData, testSet: TestSet) => {throw new NotImplementedException()},
        [QuestionType.SINGLE_CHOICE]: (questionData: CreateQuestionData, testSet: TestSet) => {throw new NotImplementedException()},
        [QuestionType.SORTING]: (questionData: CreateQuestionData, testSet: TestSet) => this.createSortingQuestion(questionData, testSet),

    }

    createQuestion(createQuestionData: CreateQuestionData, testSet: TestSet): Question{
        const question: Question = this.Types2Functions[createQuestionData.type](createQuestionData, testSet);
        return question
    }

    createSortingQuestion(createQuestionData: CreateQuestionData, testSet: TestSet): Question{
        const question = this.questionRepository.create({
            question_text: createQuestionData.question_text,
            type: createQuestionData.type,
        })
        const letters = randomLetters(createQuestionData.correct_answers.length)

        if (createQuestionData.correct_answers.length < 2 ||
            createQuestionData.correct_answers.length > QuestionService.MaxAnswers){
            throw new BadRequestException(`Number of answers is too big (maximum number of answers: ${QuestionService.MaxAnswers})`)
        }

        const propositions: AnswerProposition[] = []
        for (let i in createQuestionData.correct_answers){
            const proposition: AnswerProposition = this.answerPropositionRepository.create({
                character: letters[i],
                proposition: createQuestionData.correct_answers[i]
            })
            proposition.question = question
            propositions.push(proposition);
        }
        // sorting so that answers arent in right order when fetched
        question.answer_propositions = propositions.sort((proposition1, proposition2) => 
            proposition1.character.charCodeAt(0) - proposition2.character.charCodeAt(0))

        
        const correctAnsStr: string = letters.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            "",
        )
        const correctAns: CorrectAnswer = this.correctAnswerRepository.create({
            answer: correctAnsStr
        })
        correctAns.question = question
        question.correct_answers = [correctAns]

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

