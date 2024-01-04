import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Admin } from 'src/app/interfaces/Admin';
import { Store } from '@ngrx/store';
import * as AuthActions from 'src/app/auth.actions'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin'; // Adjust the API URL based on your backend configuration

  constructor(private http: HttpClient, private store: Store) {}

  getAllAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(`${this.apiUrl}`);
  }

  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  addAdmin(admin: any): Observable<Admin> {
    return this.http.post<Admin>(`${this.apiUrl}`, admin);
  }
}
