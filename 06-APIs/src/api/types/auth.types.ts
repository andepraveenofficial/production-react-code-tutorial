export interface SignupRequestPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: string;
}

export interface SigninRequestPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}