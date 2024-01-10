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
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ auth: authReducer }),
    BrowserAnimationsModule,
    TableModule,
    TagModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
