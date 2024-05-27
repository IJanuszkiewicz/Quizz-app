import { Test, TestingModule } from '@nestjs/testing';
import { TestSetService } from './testSet.service';
import { TeacherService } from 'src/teachers/teacher.service';
import { QuestionService } from 'src/questions/question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSet } from 'src/graphql/models/testSet';
import { CreateQuestionData } from 'src/utils/createQuestionData';
import { CreateTestSetData } from 'src/utils/createTestSetData';
import { Teacher } from 'src/graphql/models/teacher';
import { Question, QuestionType } from 'src/graphql/models/question';

describe('TestSetService', () => {
    let service: TestSetService;

    const mockTestSetRepository = {
        find: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    const mockTeacherService = {
        getTeacherById: jest.fn(),
    };

    const mockQuestionService = {
        checkAnswer: jest.fn(),
        createQuestion: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestSetService,
                { provide: getRepositoryToken(TestSet), useValue: mockTestSetRepository },
                { provide: TeacherService, useValue: mockTeacherService },
                { provide: QuestionService, useValue: mockQuestionService },
            ],
        }).compile();

        service = module.get<TestSetService>(TestSetService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    describe('newTestSet', () => {
        it('should create and save a new test set', async () => {
            const createQuestionData: CreateQuestionData = {
                question_text: 'What is 2+2?',
                type: QuestionType.SINGLE_CHOICE,
                correct_answers: ['4'],
                wrong_answers: ['3', '5']
            };

            const createTestSetData: CreateTestSetData = {
                teacher_id: 1,
                name: 'Sample Test Set',
                questions_data: [createQuestionData]
            };

            const teacher: Teacher = {
                id: 1,
                name: 'John',
                surname: 'Doe',
                display_name: 'JD',
                test_sets: []
            };

            const question: Question = {
                id: 1,
                question_text: 'What is 2+2?',
                type: QuestionType.SINGLE_CHOICE,
                test_set: null,
                correct_answers: [],
                answer_propositions: []
            };

            const testSet: TestSet = {
                id: 1,
                name: 'Sample Test Set',
                teacher,
                questions: [question]
            };

            mockTestSetRepository.create.mockReturnValue(testSet);
            mockTeacherService.getTeacherById.mockResolvedValue(teacher);
            mockQuestionService.createQuestion.mockReturnValue(question);
            mockTestSetRepository.save.mockResolvedValue(testSet);

            const result = await service.newTestSet(createTestSetData);
            expect(result).toEqual(testSet);
            expect(mockTestSetRepository.create).toHaveBeenCalledWith(createTestSetData);
            expect(mockTeacherService.getTeacherById).toHaveBeenCalledWith(createTestSetData.teacher_id);
            expect(mockQuestionService.createQuestion).toHaveBeenCalledWith(createQuestionData, testSet);
            expect(mockTestSetRepository.save).toHaveBeenCalledWith(testSet);
        });
    });
});
