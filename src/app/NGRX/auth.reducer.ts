import { createReducer, on } from '@ngrx/store';
import * as AuthActions from 'src/app/NGRX/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  role: string;
  user: any | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  role: '',
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user, role }) => ({
    ...state,
    isAuthenticated: true,
    role: role,
    user,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }))
);
