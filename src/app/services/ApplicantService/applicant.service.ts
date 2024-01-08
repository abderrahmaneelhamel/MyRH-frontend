import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from 'src/app/interfaces/Applicant';
import { Application } from 'src/app/interfaces/Application';


@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private apiUrl = 'http://localhost:8080/api/applicant';

  constructor(private http: HttpClient) {}

  getAllApplicants(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(this.apiUrl);
  }

  getApplicantById(id: number): Observable<Applicant> {
    return this.http.get<Applicant>(`${this.apiUrl}/${id}`);
  }

  addApplicant(applicantData: any): Observable<Applicant> {
    const applicantForm = new FormData();
          applicantForm.append('firstName', applicantData.firstName);
          applicantForm.append('lastName', applicantData.lastName);
          applicantForm.append('password', applicantData.password);
          applicantForm.append('email', applicantData.email);
          applicantForm.append('level', applicantData.level);
          applicantForm.append('profile', applicantData.profile);
          applicantForm.append('city', applicantData.city);
          applicantForm.append('cv', applicantData.cv as File);
    return this.http.post<Applicant>(this.apiUrl, applicantForm);
  }

  applyToJob(application: any): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/apply`, application);
  }

  getApplicationsByApplicantId(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/${id}`);
  }
}
