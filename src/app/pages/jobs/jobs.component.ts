import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/interfaces/Company';
import { Job } from 'src/app/interfaces/Job';
import { Status } from 'src/app/interfaces/Status';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { JobService } from 'src/app/services/JobService/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  companies : Company[] = [];
  filteredJobs: Job[] = [];
  selectedCompany!: string;

  constructor(private jobService: JobService,private companyService: CompanyService,private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
    this.loadCompanies();
  }

  loadJobs() {
    this.jobService.getAllJobs().subscribe(
      (data: Job[]) => {
        this.jobs = data.filter(job => job.status === Status.ACCEPTED);
        this.jobs = this.jobs.filter(job => job.status === Status.ACCEPTED);
        this.filteredJobs = this.jobs;
      },
      error => {
        console.error('Error loading jobs:', error);
      }
    );
  }

  loadCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      error => {
        console.error('Error loading companies:', error);
      }
    );
  }

  applyForJob(job: Job) {
    if (job.id !== undefined) {
      this.router.navigate(['/apply'], { queryParams: { jobId: job.id.toString() } });
    } else {
      console.error('Job ID is undefined');
    }
  }

  filterByCompany(company: string) {
    console.log('====================================');
    console.log(company,"tht",this.selectedCompany);
    console.log('====================================');
    if (company === 'all') {
      this.filteredJobs = this.jobs;
    } else {
      this.filteredJobs = this.jobs.filter(job => job.company.name === this.selectedCompany);
    }
  }
}
