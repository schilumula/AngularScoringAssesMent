import { Observable } from 'rxjs/Observable';
import { Choice } from './../model/choice.model';
import { Question } from './../model/question.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class QuestionsService {
  private questions: Question[];
  constructor(private httpClient: HttpClient) {}

  getQuestions() {
    if (!this.questions) {
      return this.httpClient
        .get('./assets/questions.json', { responseType: 'json' })
        .pipe(
          map((res: any) => {
            this.questions = [];
            res.questions.forEach((query: any) => {
              let choices: Choice[] = [];
              query.choices.forEach((choice: any) => {
                choices.push(
                  new Choice(choice.id, choice.choice, choice.isValid)
                );
              });
              let q: Question = new Question(
                query.id,
                query.heading,
                query.question,
                choices
              );
              this.questions.push(q);
            });
            console.log(this.questions);
            return this.questions;
          })
        );
    } else {
        return new Observable((observer) => {
         observer.next(this.questions)
        });
    }
  }

  getQuestionById(id: any) {
    let query: any = null;
    this.questions.forEach(question => {
      if (question.id === Number(id)) {
        query = question;
      }
    });
    console.log('Querying for question: ' + JSON.stringify(query));
    return query;
  }

  setSelectedResponse(ques: Question, answer: Choice) {
    console.log('Saving the user selected response');
    this.questions.forEach(question => {
      if (question.id === ques.id) {
        question.selectedResponse = answer;
      }
    });
  }

  getFirstQuestion() {
    return this.questions[0];
  }

  getCurrentQuestionIndex(currentQuestion: Question) {
    let id = this.questions.findIndex(
      element => element.id === currentQuestion.id
    );
    return id;
  }

  getNextQuestionId(currentQuestion: Question) {
    let id = this.getCurrentQuestionIndex(currentQuestion);
    if (id + 1 >= this.questions.length) {
      return 'summary';
    } else {
      return this.questions[id + 1].id;
    }
  }

  getPreviousQuestionId(currentQuestion: Question) {
    let id = this.getCurrentQuestionIndex(currentQuestion);
    if (id - 1 < 0) {
      return 'start';
    } else {
      return this.questions[id - 1].id;
    }
  }
}
