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

  addApplicant(applicant: Applicant): Observable<Applicant> {
    return this.http.post<Applicant>(this.apiUrl, applicant);
  }

  applyToJob(application: Application): Observable<Application> {
    return this.http.post<Application>(`${this.apiUrl}/apply`, application);
  }
}
