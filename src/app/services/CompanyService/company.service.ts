import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Company } from 'src/app/interfaces/Company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/company';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }

  getCompanyById(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  addCompany(companyData: any): Observable<Company> {
    const companyForm = new FormData();
          companyForm.append('name', companyData.name);
          companyForm.append('email', companyData.email);
          companyForm.append('password', companyData.password);
          companyForm.append('address', companyData.address);
          companyForm.append('phone', companyData.phone);
          companyForm.append('image', companyData.image as File);
    return this.http.post<Company>(this.apiUrl, companyForm);
  }

  updateCompanyPlan(companyId: number, planId: number): Observable<Company> {
    const credentials = {
      companyId: companyId.toString(),
      planId: planId.toString()
    };

    return this.http.post<Company>(`${this.apiUrl}/update-plan`, credentials);
  }

}
