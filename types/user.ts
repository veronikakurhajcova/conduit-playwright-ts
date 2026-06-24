export interface User {
    username?: string;
    email: string;
    password: string;
}

export interface InvalidUser extends User {
    description: string;
    isKnownBug: boolean;
    btnDisabled?: boolean;
}
