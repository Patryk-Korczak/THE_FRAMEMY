import {ROLE} from "./Register";

export interface LoginRequest {
    email: string,
    password: string
}
export interface LoginResponse {
    jwtToken: string,
    email: string,
    roles: ROLE[]
}