import { Component } from '@angular/core';
import { Store, createFeatureSelector } from '@ngrx/store';
import { AuthState } from 'src/app/NGRX/auth.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private store: Store){}

  authState$ = this.store.select(createFeatureSelector<AuthState>('auth'));

  ngOnInit(): void {
    this.authState$.subscribe((state) => {
      console.log('====================================');
      console.log(state);
      console.log('====================================');
    });
  }
}
