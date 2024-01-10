import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Job } from 'src/app/interfaces/Job';
import { Status } from 'src/app/interfaces/Status';
import { JobService } from 'src/app/services/JobService/job.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { Company } from 'src/app/interfaces/Company';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent implements OnInit {
  @ViewChild('jobTable') jobTable!: Table;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  jobs: Job[] = [];
  loading: boolean = true;
  searchText: string = '';
  companies: Company[] = [];
  status: Status = Status.PENDING;

  jobForm!: FormGroup;

  constructor(private jobService: JobService, private fb: FormBuilder,private companyService: CompanyService) {}

  ngOnInit() {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs;
      this.loading = false;
    });
    this.companyService.getAllCompanies().subscribe(
      (companies) => {
        this.companies = companies;
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );

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
      CompanyId: this.fb.control(0, [Validators.required, Validators.min(0)]),
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

  acceptJob(job : Job){
    const JobData = {
      id: job.id,
      title: job.title,
      description: job.description,
      level: job.level,
      salary: job.salary,
      profile: job.profile,
      city: job.city,
      status: Status.ACCEPTED,
    };
    this.jobService.updateJob(JobData).subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
  refuseJob(job : Job){
    const JobData = {
      id: job.id,
      title: job.title,
      description: job.description,
      level: job.level,
      salary: job.salary,
      profile: job.profile,
      city: job.city,
      status: Status.DENIED,
    };
    this.jobService.updateJob(JobData).subscribe(
      (jobs) => {
        this.jobs = jobs;
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
}
