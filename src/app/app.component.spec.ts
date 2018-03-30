import { TranslateService } from '@ngx-translate/core';
import { MaterialModule } from './shared-modules/material.module';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('AppComponent', () => {
  let translateServiceStub = jasmine.createSpyObj('translateService', [
    'addLangs',
    'setDefaultLang',
    'getBrowserLang',
    'use'
  ]);

  beforeEach(
    async(() => {
      translateServiceStub.getBrowserLang.and.returnValue('en');
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [
          RouterTestingModule,
          MaterialModule
        ],
        providers: [
          {provide: TranslateService, useValue: translateServiceStub}
        ]
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
  it(
    `should have as title 'app'`,
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.title).toEqual('app');
    })
  );

  it('should call setDefaultLang() with en', () => {
    expect(translateServiceStub.setDefaultLang).toHaveBeenCalledWith('en');
  });
});
