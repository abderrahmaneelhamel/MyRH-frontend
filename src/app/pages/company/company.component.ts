import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Job } from 'src/app/interfaces/Job';
import { Status } from 'src/app/interfaces/Status';
import { JobService } from 'src/app/services/JobService/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { Company } from 'src/app/interfaces/Company';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from 'src/app/auth.selectors';
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

  constructor(private jobService: JobService, private fb: FormBuilder,private companyService: CompanyService,private store: Store) {}

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
        this.popupComponent.Toggle();
      },
      (error) => {
        console.error('Error creating job:', error);
      }
    );
  }
}

