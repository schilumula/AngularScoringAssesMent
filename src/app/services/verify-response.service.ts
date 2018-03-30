import { Choice } from './../model/choice.model';
import { Question } from './../model/question.model';
import { Injectable } from '@angular/core';

@Injectable()
export class VerifyResponseService {

    isValidResponse(question: Question, response: Choice): boolean {
        if (response.isValid) {
            return true;
        }
        return false;
    }
}