import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { AuthState } from 'src/app/NGRX/auth.reducer';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;

  authState$ = this.store.select(createFeatureSelector<AuthState>('auth'));

  constructor(
    private store: Store,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.authState$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
  }
}
