import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/NGRX/auth.actions';
import { Admin } from 'src/app/interfaces/Admin';
import Swal from 'sweetalert2';
import { Company } from 'src/app/interfaces/Company';
import { Applicant } from 'src/app/interfaces/Applicant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  authenticateAdmin(credentials: { email: string; password: string }) {
    this.http
      .post<any>(`${this.apiUrl}/admin/authinticate`, credentials)
      .subscribe(
        (response: any) => {
          const authenticatedAdmin: Admin = response;
          this.store.dispatch(
            AuthActions.loginSuccess({
              user: authenticatedAdmin,
              role: 'admin',
            })
          );
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Failed',
            text: 'Invalid email or password',
          });
        }
      );
  }
  authenticateCompany(credentials: { email: string; password: string }) {
    this.http
      .post<any>(`${this.apiUrl}/company/authinticate`, credentials)
      .subscribe(
        (response: any) => {
          const authenticatedCompany: Company = response;
          this.store.dispatch(
            AuthActions.loginSuccess({
              user: authenticatedCompany,
              role: 'company',
            })
          );
          this.router.navigate(['/company']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Failed',
            text: 'Invalid email or password',
          });
        }
      );
  }
  authenticateApplicant(credentials: { email: string; password: string }) {
    this.http
      .post<any>(`${this.apiUrl}/applicant/authinticate`, credentials)
      .subscribe(
        (response: any) => {
          const authenticatedApplicant: Applicant = response;
          this.store.dispatch(
            AuthActions.loginSuccess({
              user: authenticatedApplicant,
              role: 'applicant',
            })
          );
          this.router.navigate(['/jobs']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Failed',
            text: 'Invalid email or password',
          });
        }
      );
  }
  adminLogout(id: number){
    this.http.get(`${this.apiUrl}/admin/logout/${id}`).subscribe()
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
  companyLogout(id: number){
    this.http.get(`${this.apiUrl}/company/logout/${id}`).subscribe()
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
  applicantLogout(id: number){
    this.http.get(`${this.apiUrl}/applicant/logout/${id}`).subscribe()
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
