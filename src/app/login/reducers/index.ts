import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on
} from '@ngrx/store';
import { UserLogin } from 'src/app/shared/entity.interface';
import * as AuthAction from '../store/login.action';

export const loginFeatureKey = 'login';

export const initialAuthState: AuthState = {
  user: undefined
};

export interface AuthState {
  user: UserLogin;
}



export const  authReducer = createReducer(
  initialAuthState,
  on(AuthAction.login, (state, action) => {
    return {
      user: action.user
    };
  }),
  on(AuthAction.logout, (state, action) => {
    return {
      user: undefined
    };
  }),
  on(AuthAction.guardLogin, (state, action) => {
    return {
      user: action.user
    };
  })
);
