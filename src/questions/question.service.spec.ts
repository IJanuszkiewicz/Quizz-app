import { Test, TestingModule } from "@nestjs/testing";
import { QuestionService } from "./question.service"
import { Question, QuestionType } from "src/graphql/models/question";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CorrectAnswer } from "src/graphql/models/correctAnswers";
import { AnswerProposition } from "src/graphql/models/answerPropositions";
import { CreateQuestionData } from "src/utils/createQuestionData";

describe('QuestionServiceTest', () => {
    let service: QuestionService;

    const mockQuestionRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn()
    };

    const mockCorrectAnswerRepository = {
        create: jest.fn(),
    }

    const mockAnswerPropositionRepository = {
        create: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                QuestionService,
                { provide: getRepositoryToken(Question), useValue: mockQuestionRepository },
                { provide: getRepositoryToken(CorrectAnswer), useValue: mockCorrectAnswerRepository },
                { provide: getRepositoryToken(AnswerProposition), useValue: mockAnswerPropositionRepository }
            ]
        }).compile()

        service = module.get<QuestionService>(QuestionService)
    })
    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    
    describe('checkAnswer', () => {
        it('should check if the answer is correct', async () =>{
            const answerProposition1: AnswerProposition = {
                id: 1,
                character:'a',
                proposition: '3',
                question: null,
            }

            const answerProposition2: AnswerProposition = {
                id: 2,
                character:'b',
                proposition: '4',
                question: null,
            }

            const answerProposition3: AnswerProposition = {
                id: 3,
                character:'c',
                proposition: '5',
                question: null,
            }

            const correct: CorrectAnswer = {
                id: 1,
                answer: 'b',
                question: null,
            }

            const question: Question = {
                id: 1,
                question_text: 'What is 2+2?',
                type: QuestionType.SINGLE_CHOICE,
                test_set: null,
                correct_answers: [correct],
                answer_propositions: [
                    answerProposition1, 
                    answerProposition2,
                    answerProposition3,
                ]
            }

            mockQuestionRepository.findOne.mockReturnValue(question)
            const ansGood: boolean = await service.checkAnswer(1, 'b')
            const ansBad: boolean = await service.checkAnswer(1, 'a')

            expect(ansGood).toEqual(true)
            expect(ansBad).toEqual(false)
        })
    }) 

})