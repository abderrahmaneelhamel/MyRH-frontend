import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {createFeatureSelector, Store} from "@ngrx/store";
import {AuthState} from "../../NGRX/auth.reducer";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authService/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

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
}
