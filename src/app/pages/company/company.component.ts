import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Job } from 'src/app/interfaces/Job';
import { Status } from 'src/app/interfaces/Status';
import { JobService } from 'src/app/services/JobService/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/interfaces/Company';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/auth.selectors';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent  implements OnInit {
  @ViewChild('jobTable') jobTable!: Table;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  jobs: Job[] = [];
  loading: boolean = true;
  searchText: string = '';
  company!: Company;
  status: Status = Status.PENDING;

  jobForm!: FormGroup;

  constructor(private jobService: JobService, private fb: FormBuilder,private store: Store,private router: Router) {}

  ngOnInit() {
    this.store.select(selectLoggedInUser).subscribe(loggedInCompany => {
      if (loggedInCompany) {
        this.company = loggedInCompany;
        this.jobService.getAllJobs().subscribe(jobs => {
          this.jobs = jobs.filter(job => job.company.id === loggedInCompany.id);
          this.loading = false;
        });
      }
    });
    this.initializeForm();
  }

  private initializeForm() {
    this.jobForm = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      level: this.fb.control('', [Validators.required]),
      salary: this.fb.control(0, [Validators.required, Validators.min(0)]),
      profile: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      status: this.status,
      CompanyId: this.company.id,
    });
  }

  onSubmit() {
    const { title, description, level, salary, profile, city , status , CompanyId} = this.jobForm.value;

    this.jobService.addJob({ title, description, level, salary, profile, city, status , CompanyId}).subscribe(
      (job) => {
        this.jobs.push(job);
        this.jobForm.reset();
        this.initializeForm();
        this.popupComponent.Toggle();
      },
      (error) => {
        console.error('Error creating job:', error);

        if (error.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'over the limit',
            text: 'You have reached the maximum number of jobs for this plan',
          });
          this.router.navigate(['/subscription-plans']);
        }
      }
    );
  }
}

