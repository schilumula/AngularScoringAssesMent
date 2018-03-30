import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(
    public router: Router
  ) {}

  ngOnInit() {
  }

  onStartClick() {
    this.router.navigate(['/question/1']);
  }
}
