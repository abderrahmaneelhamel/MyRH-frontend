import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/interfaces/Company';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { PopupComponent } from '../../popup/popup.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-companies-table',
  templateUrl: './companies-table.component.html',
  styleUrls: ['./companies-table.component.css']
})
export class CompaniesTableComponent implements OnInit {
  @ViewChild('dt2') companiesTable!: Table;
  @ViewChild(PopupComponent) popupComponent!: PopupComponent;
  companies: Company[] = [];
  loading: boolean = true;

  companyForm!: FormGroup;

  constructor(private companyService: CompanyService, private fb: FormBuilder,private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe(companies => {
      this.companies = companies;
      this.loading = false;
    });

    this.initializeForm();
  }
  getImageUrl(companyImage:any) {
    const imageUrl = `data:${companyImage.type};base64,${companyImage.data}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  private initializeForm() {
    this.companyForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      image: this.fb.control(null, [Validators.required]),
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.companyForm.patchValue({ image: file });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const companyData = {
        name: this.companyForm.get('name')!.value,
        email: this.companyForm.get('email')!.value,
        password: this.companyForm.get('password')!.value,
        address: this.companyForm.get('address')!.value,
        phone: this.companyForm.get('phone')!.value,
        image: this.companyForm.get('image')!.value,
      };

      this.companyService.addCompany(companyData).subscribe(
        (company) => {
          this.companies.push(company);
          this.companyForm.reset();
          this.popupComponent.Toggle();
        },
        (error) => {
          console.error('Error creating company:', error);
        }
      );
    } else {
      Object.keys(this.companyForm.controls).forEach(key => {
        this.companyForm.get(key)!.markAsDirty();
        this.companyForm.get(key)!.updateValueAndValidity();
      });
    }
  }
}
