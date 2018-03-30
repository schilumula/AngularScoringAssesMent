import { Choice } from './choice.model';

export class Question {
         public selectedResponse: Choice;
         public validResponse: Choice;

         constructor(public id: number, public heading:string, public question: string, public choices: Choice[]) {
             
         }
       }