import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { JobsComponent } from './pages/jobs/jobs.component';
import { ApplyComponent } from './pages/apply/apply.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './AuthGuard';
import { CompanyComponent } from './pages/company/company.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { JobComponent } from './pages/job/job.component';
import { SubscriptionPlansComponent } from './pages/subscription-plans/subscription-plans.component';
import { MyApplicationsComponent } from './pages/my-applications/my-applications.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { TestsComponent } from './pages/tests/tests.component';
import { QuizComponent } from './pages/quiz/quiz.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'quiz',
    component: CreateQuizComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'tests',
    component: TestsComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuard],
    data: { role: 'company' },
  },
  {
    path: 'jobs',
    component: JobsComponent,
    canActivate: [AuthGuard],
    data: { role: 'applicant' },
  },
  {
    path: 'job/:id',
    component: JobComponent,
    canActivate: [AuthGuard],
    data: { role: 'company' },
  },
  {
    path: 'subscription-plans',
    component: SubscriptionPlansComponent,
    canActivate: [AuthGuard],
    data: { role: 'company' },
  },
  {
    path: 'apply',
    component: ApplyComponent,
    canActivate: [AuthGuard],
    data: { role: 'applicant' },
  },
  {
    path: 'test',
    component: QuizComponent,
    canActivate: [AuthGuard],
    data: { role: 'applicant' },
  },
  {
    path: 'testquizz',
    component: QuizzTestComponent,
    canActivate: [AuthGuard],
    data: { role: 'applicant' },
  },
  {
    path: 'my-applications',
    component: MyApplicationsComponent,
    canActivate: [AuthGuard],
    data: { role: 'applicant' },
  },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
