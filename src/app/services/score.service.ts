import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {
  public score: number = 0;

  incrementScore() {
    this.score++;
  }

  decrementScore() {
    if (this.score > 0) {
      this.score = this.score - 1;
    }
  }
}
