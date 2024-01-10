import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../../interfaces/Job';
import { Application } from 'src/app/interfaces/Application';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/job';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiUrl}/${id}`);
  }

  getApplicationById(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/applications/${id}`);
  }

  addJob(job: any): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateApplication(application : any): Observable<Application[]> {
    return this.http.post<Application[]>(`${this.apiUrl}/updateApplication`, application);
  }
  
  updateJob(job : any): Observable<Job[]> {
    return this.http.post<Job[]>(`${this.apiUrl}/updateJob`, job);
  }
}
