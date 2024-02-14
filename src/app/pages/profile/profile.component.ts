import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {createFeatureSelector, Store} from "@ngrx/store";
import {AuthState} from "../../NGRX/auth.reducer";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';
import { selectLoggedInUser } from 'src/app/NGRX/auth.selectors';
import { Applicant } from 'src/app/interfaces/Applicant';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  applicant! : Applicant;

  constructor(
    private store: Store,
    private applicantService : ApplicantService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.store.select(selectLoggedInUser).subscribe((loggedInApplicant) => {
      if (loggedInApplicant) {
        this.applicantService.getApplicantById(loggedInApplicant.id).subscribe(
          (applicant) => {
          this.applicant = applicant;
        },
        (error) => {
          console.log(error);
        });

      }
    });
  }

  getfile(file:any) {
    const Url = `data:${file.type};base64,${file.data}`;
    return this.sanitizer.bypassSecurityTrustUrl(Url);
  }
}
