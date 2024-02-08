import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/interfaces/Application';
import { Status } from 'src/app/interfaces/Status';
import { JobService } from 'src/app/services/JobService/job.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent implements OnInit {
  readonly columns = ['name', 'email', 'level', 'status', 'Profile', 'application message', 'application status', 'actions'];
  jobId!: number;
  applications: Application[] = [];

  constructor(private cdRef: ChangeDetectorRef,private route: ActivatedRoute,private jobService: JobService,private sanitizer: DomSanitizer){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.jobId = +params['id'];
    });
    this.getJob();
  }

  getJob() {
    this.jobService.getApplicationById(this.jobId).subscribe(
      (applications) => {
        this.applications = applications;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  acceptApplication(applicationId: any) {
    const applicationData = {
      id: applicationId,
      date: '',
      message: '',
      job_id: 0,
      applicant_id: 0,
      status: Status.ACCEPTED,
    };

    this.jobService.updateApplication(applicationData).subscribe(
      (applications) => {
        this.applications = applications;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getfile(companyImage:any) {
    const imageUrl = `data:${companyImage.type};base64,${companyImage.data}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  refuseApplication(applicationId: any) {
    const applicationData = {
      id: applicationId,
      date: '',
      message: '',
      job_id: 0,
      applicant_id: 0,
      status: Status.DENIED,
    };
    this.jobService.updateApplication(applicationData).subscribe(
      (applications) => {
        this.applications = applications;
        this.cdRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
