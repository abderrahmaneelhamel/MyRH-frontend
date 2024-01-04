import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Applicant } from 'src/app/interfaces/Applicant';
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupComponent } from '../../popup/popup.component';

@Component({
  selector: 'app-applicants-table',
  templateUrl: './applicants-table.component.html',
  styleUrls: ['./applicants-table.component.css']
})
export class ApplicantsTableComponent implements OnInit {
  @ViewChild('dt2') applicantsTable!: Table;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  applicants: Applicant[] = [];
  loading: boolean = true;

  applicantForm!: FormGroup;

  constructor(private applicantService: ApplicantService, private fb: FormBuilder) {}

  ngOnInit() {
    this.applicantService.getAllApplicants().subscribe(applicants => {
      this.applicants = applicants;
      this.loading = false;
    });

    this.initializeForm();
  }

  private initializeForm() {
    this.applicantForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.email]),
      level: this.fb.control('', [Validators.required]),
      profile: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
    });
  }

  onSubmit() {
    const formData = this.applicantForm.value;

    this.applicantService.addApplicant(formData).subscribe(
      (applicant) => {
        this.applicants.push(applicant);
        this.applicantForm.reset();
        this.applicantsTable.reset();
        this.popupComponent.Toggle();
      },
      (error) => {
        console.error('Error adding applicant:', error);
      }
    );
  }
}
