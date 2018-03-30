import { Question } from './../../model/question.model';
import { Observable } from 'rxjs/Observable';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { ScorePageComponent } from './../score-page/score-page.component';
import { routes } from './../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ScoreService } from './../../services/score.service';
import { QuestionsService } from './../../services/questions.service';
import { MultiChoiceComponent } from './multi-choice-question.component';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import {
  MatCardModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Choice } from '../../model/choice.model';
describe('MultiChoiceComponent', () => {
  let component: MultiChoiceComponent;
  let fixture: ComponentFixture<MultiChoiceComponent>;
  let questionServiceStub = jasmine.createSpyObj('questionServiceStub', [
    'getQuestions',
    'getQuestionById',
    'setSelectedResponse',
    'getFirstQuestion',
    'getCurrentQuestionIndex',
    'getNextQuestionId',
    'getPreviousQuestionId'
  ]);
  let scoreServiceStub = jasmine.createSpyObj('scoreServiceStub', [
    'incrementScore',
    'decrementScore'
  ]);
  let activatedRouteStub = {
    paramMap: {
      subscribe: () => {
        return Observable.create({
          params: {
            id: 1
          }
        });
      }
    }
  };
  let router: Router;
  let mockGetQuestionById = new Subject<Question>();
  let mockGetQuestions = new Subject<Question[]>();
  let mockGetQuestionIndex = new Subject<number>();
  beforeEach(
    async(() => {
      questionServiceStub.getQuestions.and.callFake(() => {
        return mockGetQuestions.asObservable();
      });
      questionServiceStub.getQuestionById.and.callFake(() => {
        return mockGetQuestionById.asObservable();
      });
      questionServiceStub.getCurrentQuestionIndex.and.callFake(() => {
        return mockGetQuestionIndex.asObservable();
      });
      TestBed.configureTestingModule({
        declarations: [
          MultiChoiceComponent,
          LandingPageComponent,
          ScorePageComponent,
          PageNotFoundComponent
        ],
        imports: [
          MatCardModule,
          MatButtonModule,
          MatListModule,
          RouterTestingModule.withRoutes(routes),
          TranslateModule.forChild()
        ],
        providers: [
          { provide: ActivatedRoute, useValue: activatedRouteStub },
          { provide: QuestionsService, useValue: questionServiceStub },
          { provide: ScoreService, useValue: scoreServiceStub }
        ]
      }).compileComponents(); // compile template and css
      router = TestBed.get(Router);
      router.initialNavigation();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(MultiChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockGetQuestions.next([
      new Question(1, 'sample1', 'Q1', [new Choice(1, 'option1', true)])
    ]);
    mockGetQuestionById.next(
      new Question(1, 'sample1', 'Q1', [new Choice(1, 'option1', true)])
    );
    mockGetQuestionIndex.next(1);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
