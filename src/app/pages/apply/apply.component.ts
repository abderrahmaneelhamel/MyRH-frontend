import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/interfaces/Job';
import { JobService } from 'src/app/services/JobService/job.service';
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectLoggedInUser } from 'src/app/auth.selectors'; 
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Applicant } from 'src/app/interfaces/Applicant';
import { Status } from 'src/app/interfaces/Status';
 
@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  jobId!: number;
  job!: Job;
  applicationForm!: FormGroup;
  applicant! : Applicant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private fb: FormBuilder,
    private ApplicantService: ApplicantService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.select(selectLoggedInUser).subscribe(loggedInApplicant => {
      if (loggedInApplicant) {
        this.applicant = loggedInApplicant;
      }
    });
    this.route.queryParams.subscribe(params => {
      this.jobId = +params['jobId'];
    });
    this.getJob();
    this.initializeForm();
  }

  getJob() {
    this.jobService.getJobById(this.jobId).subscribe(
      (job) => {
        this.job = job;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initializeForm() {
    this.applicationForm = this.fb.group({
      message: this.fb.control('', [Validators.required]),
    });
  }

  applyForJob() {
    if (this.applicationForm.valid) {
      const applicationData = {
        date: new Date(),
        message: this.applicationForm.value.message,
        job_id: this.job.id,
        applicant_id: this.applicant.id,
        status: Status.PENDING,
      };

      this.ApplicantService.applyToJob(applicationData).subscribe(
        (application) => {
          console.log('Application submitted successfully:', application);
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: 'Application submitted successfully',
          });
          this.router.navigate(['/jobs']);
        },
        (error) => {
          console.error('Error applying for job:', error);
        }
      );
    }
  }
}
