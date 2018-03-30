import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LandingPageComponent],
        imports: [RouterTestingModule, MatCardModule, MatButtonModule]
      }).compileComponents(); // compile template and css
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
