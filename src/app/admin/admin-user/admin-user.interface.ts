interface IBaseAdminUser {
    username: string;
    email: string;
    password: string;
}

export interface ICreateUpdateAdminUser extends IBaseAdminUser {
    password_confirm: string;
}

export interface IAdminUser extends IBaseAdminUser {
    id: number;
    logins: string;
    last_login: string;
}
