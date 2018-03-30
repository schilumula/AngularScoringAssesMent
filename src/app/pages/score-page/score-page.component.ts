import { ScoreService } from './../../services/score.service';
import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.scss']
})
export class ScorePageComponent implements OnInit {
  constructor(
    public scoreService: ScoreService,
    private location: LocationStrategy
  ) {}

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
