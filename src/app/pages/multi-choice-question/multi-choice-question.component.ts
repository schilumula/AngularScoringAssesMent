import { Choice } from './../../model/choice.model';
import { Question } from './../../model/question.model';
import { QuestionsService } from './../../services/questions.service';
import { ScoreService } from './../../services/score.service';
// import { VerifyResponseService } from './../../services/verify-response.service';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'multi-choice-question',
  templateUrl: './multi-choice-question.component.html',
  styleUrls: ['./multi-choice-question.component.scss']
})
export class MultiChoiceComponent implements OnInit, AfterViewInit {
  @ViewChildren('choices', { read: ElementRef })
  public choiceElements: QueryList<ElementRef>;
  public questions: Question[];
  public totalSteps: number = 0;
  public currentStep: number = 0;
  public currentQuestion: Question;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionService: QuestionsService,
    private scoreService: ScoreService // private scoreService: ScoreService
  ) {}

  ngOnInit() {
    this.questionService.getQuestions().subscribe((res: Question[]) => {
      this.totalSteps = res.length;
      if (this.totalSteps > 0) {
        this.currentStep = 1;
      }
      this.route.paramMap.subscribe((res: any) => {
        console.log('In route param:' + JSON.stringify(res));
        this.currentQuestion = this.questionService.getQuestionById(
          res.params['id']
        );
        this.currentStep =
          this.questionService.getCurrentQuestionIndex(this.currentQuestion) +
          1;
        if (this.currentQuestion === null) {
          this.router.navigate(['/error']);
        }
      });
    });
  }

  ngAfterViewInit() {}

  onResponseSelect(question: Question, answer: Choice) {
    this.choiceElements.forEach(matButon => {
      if (matButon.nativeElement.textContent === answer.choice) {
        matButon.nativeElement.style.backgroundColor = '#15B9DC';
        matButon.nativeElement.style.color = '#ffffff';
      } else {
        matButon.nativeElement.style.backgroundColor = '#9896A3';
        matButon.nativeElement.style.color = '#000000';
      }
    });
    let prevResponse: boolean = this.questionService.getQuestionById(
      question.id
    ).selectedResponse
      ? this.questionService.getQuestionById(question.id).selectedResponse
          .isValid
      : false;
    this.questionService.setSelectedResponse(question, answer);
    this.currentQuestion.selectedResponse = answer;
    if (answer.isValid && !prevResponse) {
      this.scoreService.incrementScore();
    } else if (!answer.isValid && prevResponse) {
      this.scoreService.decrementScore();
    }
    this.onNextClick();
    // this.verifyResponse.isValidResponse(question, answer);
  }

  onPreviousClick() {
    let id = this.questionService.getPreviousQuestionId(this.currentQuestion);
    this.router.navigate([`/question/${id}`]);
  }

  onNextClick() {
    let id = this.questionService.getNextQuestionId(this.currentQuestion);
    this.router.navigate([`/question/${id}`]);
  }

  getBgColor(currentQuestion: Question, ans: Choice) {
    if (
      currentQuestion.selectedResponse &&
      ans.id === currentQuestion.selectedResponse.id
    ) {
      return '#15B9DC';
    }
  }
}
