import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/AdminService/admin.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private authService: AuthService,private adminService: AdminService,private fb: FormBuilder) {}


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control('admin', [Validators.required]),
    });
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
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

  register(){
    const registerData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    this.adminService.addAdmin(registerData).subscribe(
      (admin)=>{
        this.authService.authenticateAdmin({email : admin.email, password : registerData.password});
      },
      (error)=>{
        console.log(error);
      })
  }
}
