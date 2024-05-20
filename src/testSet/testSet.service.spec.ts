import { Test, TestingModule } from '@nestjs/testing';
import { TestSetService } from './testSet.service';
import { TeacherService } from 'src/teachers/teacher.service';
import { QuestionService } from 'src/questions/question.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestSet } from 'src/graphql/models/testSet';

describe('TestSetService', () => {
  let service: TestSetService;
  let testSetRepository: Repository<TestSet>;

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
    testSetRepository = module.get<Repository<TestSet>>(getRepositoryToken(TestSet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  })
});
