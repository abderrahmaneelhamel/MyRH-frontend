import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { AuthState } from 'src/app/auth.reducer';
import * as AuthActions from 'src/app/auth.actions'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isOpen: boolean = false;

  authState$ = this.store.select(createFeatureSelector<AuthState>('auth'));

  constructor(private store: Store,private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.authState$.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/login']);
  }
}
