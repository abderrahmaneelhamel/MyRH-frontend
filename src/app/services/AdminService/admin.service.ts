import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Admin } from 'src/app/interfaces/Admin';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

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
