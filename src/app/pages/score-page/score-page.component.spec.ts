import { LocationStrategy } from '@angular/common';
import { ScoreService } from './../../services/score.service';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { ScorePageComponent } from './score-page.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

// async beforeEach
describe('ScorePageComponent', () => {
  let component: ScorePageComponent;
  let fixture: ComponentFixture<ScorePageComponent>;
  let scoreServiceStub = jasmine.createSpyObj('scoreServiceStub', [
    'incrementScore',
    'decrementScore'
  ]);
  let locationServiceStub = jasmine.createSpyObj('locationServiceStub', [
    'back',
    'decrementScore'
  ]);
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ScorePageComponent],
        imports: [MatCardModule, MatButtonModule],
        providers: [
          { provide: ScoreService, useValue: scoreServiceStub },
          { provide: LocationStrategy, useValue: locationServiceStub }
        ]
      }).compileComponents(); // compile template and css
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(ScorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
