import { Question } from './../model/question.model';
import { QuestionsService } from './questions.service';
import { async, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Choice } from '../model/choice.model';

describe('Questions Service', () => {
  let httpTestingController: HttpTestingController;
  let service: QuestionsService;
  let questionsJosnMock = {
    questions: [
      {
        id: 1,
        heading: 'Mathematics - Algebra',
        question:
          ' A number is increased by 2 and then multiplied by 3. The result is 24. What is this number?',
        choices: [
          { id: 1, choice: '4', isValid: 0 },
          { id: 2, choice: '6', isValid: 1 },
          { id: 3, choice: '8', isValid: 0 },
          { id: 4, choice: '10', isValid: 0 }
        ]
      }
    ]
  };
  let questionsMock = [
    new Question(1, 'sample1', 'Q1', [new Choice(1, 'option1', true)])
  ];
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: [HttpClient, QuestionsService],
        imports: [HttpClientTestingModule]
      });
      service = TestBed.get(QuestionsService);
      httpTestingController = TestBed.get(HttpTestingController);
    })
  );

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should have a service', () => {
    expect(service).toBeDefined();
  });

  it('should get questions', () => {
    service.getQuestions().subscribe((questions: Question[]) => {
      expect(questions[0].id).toBe(1);
    });

    const req = httpTestingController.expectOne('./assets/questions.json');
    expect(req.request.method).toBe('GET');
    req.flush(questionsJosnMock);
  });

  it('should get question by Id', () => {
    service['questions'] = questionsMock;
    expect(service.getQuestionById(1)).toBe(questionsMock[0]);
  });

  it('should get question index', () => {
    service['questions'] = questionsMock;
    expect(service.getCurrentQuestionIndex(service['questions'][0])).toBe(0);
  });
  
  it('should get next question id', () => {
    service['questions'] = questionsMock;
    expect(service.getNextQuestionId(service['questions'][0])).toBe('summary');
  });
  
   it('should get next question id', () => {
     service['questions'] = questionsMock;
     expect(service.getPreviousQuestionId(service['questions'][0])).toBe('start');
   });  
    
});
