import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AuthState } from '../login/reducers';
import * as AuthAction from '../login/reducers/index';

export interface AppState {
 login: AuthState;
}
export function defaultReducer<T>(state: T) { return state; }

export const reducers: ActionReducerMap<AppState> = {
  login: AuthAction.authReducer
};

export function getInitialState() {
  return {
    login: AuthAction.initialAuthState,
  } as AppState;
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
