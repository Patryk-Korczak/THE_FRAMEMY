export type ROLE = "ROLE_CUSTOMER";

export interface RegisterRequest {
    email: string;
    password: string;
}
export interface RegisterResponse {
    jwtToken: string,
    email: string,
    roles: ROLE[]
}