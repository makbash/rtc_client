export interface GenericResponse {
    status: string;
    message: string;
}

export interface IUserData {
    id: string;
    email: string;
    role: number;
    fullname: string;
    isActive: boolean;
    createdDate: Date,
    accessToken: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {
    fullname: string;
    email: string;
    password: string;
    role: number;
}

export interface ILoginResponse {
    success: boolean;
    data: IUserData;
}
