import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Application } from 'src/app/interfaces/Application';
import { Status } from 'src/app/interfaces/Status';
import { Applicant } from 'src/app/interfaces/Applicant';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/NGRX/auth.selectors';
import { Router } from '@angular/router';
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';

@Component({
  selector: 'app-my-applications',
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.css'],
})
export class MyApplicationsComponent implements OnInit {
  @ViewChild('applicationTable') applicationTable!: Table;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  applications: Application[] = [];
  loading: boolean = true;
  searchText: string = '';
  applicant!: Applicant;
  status: Status = Status.PENDING;

  constructor(
    private applicantService: ApplicantService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe((loggedInApplicant) => {
      if (loggedInApplicant) {
        this.applicant = loggedInApplicant;
        this.applicantService
          .getApplicationsByApplicantId(loggedInApplicant.id)
          .subscribe((applications) => {
            this.applications = applications;
            this.loading = false;
          });
      }
    });
  }
}
