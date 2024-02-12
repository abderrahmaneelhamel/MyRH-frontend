import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'src/app/interfaces/test';
import { Badge } from 'src/app/interfaces/badge';
import { Applicant } from 'src/app/interfaces/Applicant';
import {Job} from "../../interfaces/Job";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:8080/api/quiz';

  constructor(private http: HttpClient) {}

  getAllTest(): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}/tests`);
  }

  getTestById(id: number): Observable<Test> {
    return this.http.get<Test>(`${this.apiUrl}/test/${id}`);
  }

  createTest(test: any): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/test`, test);
  }

  createBadge(badge: Badge): Observable<Badge> {
    return this.http.post<Badge>(`${this.apiUrl}/badge`, badge);
  }

  assignBadgeToApplicant(applicantId: number, badgeId: number): Observable<Applicant> {
    return this.http.post<Applicant>(`${this.apiUrl}/assignBadge/${applicantId}/${badgeId}`, {});
  }
}
