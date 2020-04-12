import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers';



export const selectAuthState = createFeatureSelector<AuthState>('login');


export const selectUserData = createSelector(
  selectAuthState,
  auth => auth.user
);

