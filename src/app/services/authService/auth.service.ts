import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/NGRX/auth.actions';
import { Admin } from 'src/app/interfaces/Admin';
import Swal from 'sweetalert2';
import { Company } from 'src/app/interfaces/Company';
import { Applicant } from 'src/app/interfaces/Applicant';
import { State } from 'src/app/interfaces/State';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) {}

  authenticate(credentials: { email: string; password: string; role: string }) {
    const authenticateUrl = `${this.apiUrl}/auth/authenticate`;

    this.http.post<any>(authenticateUrl, credentials).subscribe(
      (response: any) => {
        const decodedToken = this.jwtHelper.decodeToken(response.access_token);
        const authenticatedUser = this.mapAuthenticatedUser(decodedToken);
        this.store.dispatch(
          AuthActions.loginSuccess({
            user: authenticatedUser,
            role: decodedToken.role.toLowerCase(),
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          })
        );
        this.router.navigate([`/`]);
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

  register(registerRequest: any) {
    const registerUrl = `${this.apiUrl}/auth/register`;

    this.http.post<any>(registerUrl, registerRequest).subscribe(
      (response: any) => {
        const decodedToken = this.jwtHelper.decodeToken(response.access_token);
        const authenticatedUser = this.mapAuthenticatedUser(decodedToken);
        this.store.dispatch(
          AuthActions.loginSuccess({
            user: authenticatedUser,
            role: decodedToken.role.toLowerCase(),
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
          })
        );
        this.router.navigate([`/`]);
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have successfully registered!',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'Error occurred during registration',
        });
      }
    );
  }

  logout() {
    const logoutUrl = `${this.apiUrl}/auth/logout`;

    this.http.post(logoutUrl, {}, { observe: 'response' }).subscribe(
      (response) => {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Logout Failed',
          text: 'Error occurred during logout',
        });
      }
    );
  }

  private mapAuthenticatedUser(
    decodedToken: any
  ): Admin | Company | Applicant | null {
    const userRole = decodedToken.role;

    switch (userRole.toLowerCase()) {
      case 'admin':
        const admin: Admin = {
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          password: '',
          state: State.ONLINE,
        };
        return admin;
      case 'company':
        const company: Company = {
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.email,
          plan: {
            id: decodedToken.plan,
          },
          password: '',
          address: '', // Update with the appropriate field from your token
          phone: '', // Update with the appropriate field from your token
          image: '', // Update with the appropriate field from your token
          state: State.ONLINE,
        };
        return company;
      case 'applicant':
        const applicant: Applicant = {
          id: decodedToken.id,
          firstName: decodedToken.name,
          lastName: decodedToken.firstName,
          email: decodedToken.email,
          password: '',
          level: '',
          profile: '',
          city: '', // Update with the appropriate field from your token
          cv: '', // Update with the appropriate field from your token
          state: State.ONLINE,
        };
        return applicant;
      default:
        return null;
    }
  }
}
