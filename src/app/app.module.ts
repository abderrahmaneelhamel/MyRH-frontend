import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobTableComponent } from './components/tables/job-table/job-table.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApplicantsTableComponent } from './components/tables/applicants-table/applicants-table.component';
import { CompaniesTableComponent } from './components/tables/companies-table/companies-table.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { PopupComponent } from './components/popup/popup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './NGRX/auth.reducer';
import { CompanyComponent } from './pages/company/company.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { JobComponent } from './pages/job/job.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
import { EffectsModule } from '@ngrx/effects';
import { CustomInterceptor } from "./interceptor/costum.interceptor";
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { AnswerFormComponent } from './components/answer-form/answer-form.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuizzTestComponent } from './pages/quizz-test/quizz-test.component';
import { TestsComponent } from './pages/tests/tests.component';
import { TestCardComponent } from './components/test-card/test-card.component';
// import { AuthEffects } from 'src/app/NGRX/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    JobTableComponent,
    ApplicantsTableComponent,
    CompaniesTableComponent,
    HomeComponent,
    DashboardComponent,
    JobsComponent,
    PopupComponent,
    NavbarComponent,
    FooterComponent,
    CardComponent,
    ApplyComponent,
    LoginComponent,
    CompanyComponent,
    UnauthorizedComponent,
    JobComponent,
    SubscriptionPlansComponent,
    MyApplicationsComponent,
    CreateQuizComponent,
    QuestionFormComponent,
    AnswerFormComponent,
    TestCardComponent,
    TestsComponent,
    QuizzTestComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    // EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    TableModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
