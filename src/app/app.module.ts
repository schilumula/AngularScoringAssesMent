import { ScorePageComponent } from './pages/score-page/score-page.component';
import { MultiChoiceComponent } from './pages/multi-choice-question/multi-choice-question.component';
import { ScoreService } from './services/score.service';
import { QuestionsService } from './services/questions.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared-modules/material.module';
import { VerifyResponseService } from './services/verify-response.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

// TODO:: Move this to App Route Module
export const routes: Routes = [
  { path: 'questions', component: LandingPageComponent },
  { path: 'question/summary', component: ScorePageComponent },
  { path: 'question/start', component: LandingPageComponent },
  { path: 'question/:id', component: MultiChoiceComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MultiChoiceComponent,
    PageNotFoundComponent,
    LandingPageComponent,
    ScorePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    QuestionsService,
    ScoreService,
    VerifyResponseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}
