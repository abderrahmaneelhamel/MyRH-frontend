import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  applicantRegisterForm!: FormGroup;
  companyRegisterForm!: FormGroup;
  roleForm!: FormGroup;
  applicantRole: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
    this.roleForm = this.fb.group({
      role: this.fb.control('applicant', [Validators.required]),
    });
    this.applicantRegisterForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.email]),
      level: this.fb.control('', [Validators.required]),
      profile: this.fb.control('', [Validators.required]),
      city: this.fb.control('', [Validators.required]),
      cv: this.fb.control(null, [Validators.required]),
    });
    this.companyRegisterForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.email]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      image: this.fb.control(null, [Validators.required]),
    });
  }

  login() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.authService.authenticate(loginData);
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    this.applicantRegisterForm.patchValue({ cv: file });
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    this.companyRegisterForm.patchValue({ image: file });
  }
  roleChoice() {
    if (this.roleForm.get('role')!.value === 'applicant') {
      this.applicantRole = true;
      this.applicantRegisterForm.reset();
      this.applicantRegisterForm.patchValue({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        level: '',
        profile: '',
        city: '',
        cv: null,
      });
      this.applicantRegisterForm.markAsUntouched();
      this.applicantRegisterForm.markAsPristine();
    } else {
      this.applicantRole = false;
      this.companyRegisterForm.reset();
      this.companyRegisterForm.patchValue({
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        image: null,
      });
      this.companyRegisterForm.markAsUntouched();
      this.companyRegisterForm.markAsPristine();
    }
  }

  registerApplicant() {
    const applicantForm = new FormData();
          applicantForm.append('name', this.applicantRegisterForm.get('firstName')!.value);
          applicantForm.append('lastName', this.applicantRegisterForm.get('lastName')!.value);
          applicantForm.append('password', this.applicantRegisterForm.get('password')!.value);
          applicantForm.append('email', this.applicantRegisterForm.get('email')!.value);
          applicantForm.append('level', this.applicantRegisterForm.get('level')!.value);
          applicantForm.append('profile', this.applicantRegisterForm.get('profile')!.value);
          applicantForm.append('city', this.applicantRegisterForm.get('city')!.value);
          applicantForm.append('file', this.applicantRegisterForm.get('cv')!.value as File);
          applicantForm.append('role', 'APPLICANT');

    this.authService.register(applicantForm);
  }
  registerCompany() {
    const companyForm = new FormData();
          companyForm.append('name', this.companyRegisterForm.get('name')!.value);
          companyForm.append('email', this.companyRegisterForm.get('email')!.value);
          companyForm.append('password', this.companyRegisterForm.get('password')!.value);
          companyForm.append('address', this.companyRegisterForm.get('address')!.value);
          companyForm.append('phone', this.companyRegisterForm.get('phone')!.value);
          companyForm.append('file', this.companyRegisterForm.get('image')!.value as File);
          companyForm.append('role', 'COMPANY');

    this.authService.register(companyForm);
  }
}
