import { createAction, props } from '@ngrx/store';
import { UserLogin } from '../../shared/entity.interface';


export const login = createAction(
    '[Login Page] User Login ',
    props<{user: UserLogin}>()
);

export const logout = createAction(
    '[Toolbar] User Logout',
);

export const guardLogin = createAction(
    '[Guard] User Login',
    props<{user: UserLogin}>()
);
