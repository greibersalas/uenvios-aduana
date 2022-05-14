export interface UserI {
    id?: number;
    user: string;
    password: string;
    estado?: number;
}

export interface UserResponse{
    ok: boolean;
    message: string;
    rows?: any;
    error?: any;
}
