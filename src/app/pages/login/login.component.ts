import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicantService } from 'src/app/services/ApplicantService/applicant.service';
import { CompanyService } from 'src/app/services/CompanyService/company.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  applicantRegisterForm!: FormGroup;
  companyRegisterForm!: FormGroup;
  roleForm!: FormGroup;
  applicantRole: boolean = true;

  constructor(private authService: AuthService,private applicantService: ApplicantService,private companyService: CompanyService,private fb: FormBuilder) {}


  ngOnInit(): void {
    this.initializeForms();
  }

  initializeForms() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control('admin', [Validators.required]),
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
  }

  login() {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    const role = this.loginForm.value.role;

    switch (role) {
      case 'admin':
        this.authService.authenticateAdmin(loginData);
        break;
      case 'company':
        this.authService.authenticateCompany(loginData);
        break;
      case 'applicant':
        this.authService.authenticateApplicant(loginData);
        break;
      default:
        this.authService.authenticateAdmin(loginData);
        break;
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.applicantRegisterForm.patchValue({ cv: file });
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    this.companyRegisterForm.patchValue({ cv: file });
  }
  roleChoice(){
    if(this.roleForm.get('role')!.value === 'applicant'){
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
    }else{
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

  registerApplicant(){
    const applicantData = {
      firstName: this.applicantRegisterForm.get('firstName')!.value,
      lastName: this.applicantRegisterForm.get('lastName')!.value,
      email: this.applicantRegisterForm.get('email')!.value,
      password: this.applicantRegisterForm.get('password')!.value,
      level: this.applicantRegisterForm.get('level')!.value,
      profile: this.applicantRegisterForm.get('profile')!.value,
      city: this.applicantRegisterForm.get('city')!.value,
      cv: this.applicantRegisterForm.get('cv')!.value,
    };
    this.applicantService.addApplicant(applicantData).subscribe(
      (applicant)=>{
        this.authService.authenticateApplicant({email : applicant.email, password : applicantData.password});
      },
      (error)=>{
        console.log(error);
      })
  }
  registerCompany(){
    const companyData = {
      name: this.companyRegisterForm.get('name')!.value,
      email: this.companyRegisterForm.get('email')!.value,
      password: this.companyRegisterForm.get('password')!.value,
      address: this.companyRegisterForm.get('address')!.value,
      phone: this.companyRegisterForm.get('phone')!.value,
      image: this.companyRegisterForm.get('image')!.value,
    };

    this.companyService.addCompany(companyData).subscribe(
      (company) => {
        this.authService.authenticateApplicant({email : company.email, password : companyData.password});
      },
      (error)=>{
        console.log(error);
      })
  }
}
