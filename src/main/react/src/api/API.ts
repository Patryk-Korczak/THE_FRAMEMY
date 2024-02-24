import axios, {AxiosError} from "axios";
import {RegisterRequest, RegisterResponse, ROLE} from "./message/Register";
import Curl from "./Curl";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginRequest, LoginResponse} from "./message/Login";
import {CartItem, Product} from "./message/Cart";
import {userActions} from "../store/user-slice";
import {ForgotPasswordRequest, ForgotPasswordResponse} from "./message/ForgotPassword";
import {ResetPasswordRequest, ResetPasswordResponse} from "./message/ResetPassword";

export interface IAuthLocalStorage {
    token: string;
    email: string;
    roles: ROLE[];
}

const authHeader = () => {
    const {token}: IAuthLocalStorage = JSON.parse(localStorage.getItem('auth') ?? "{}");

    return (token)
        ? {Authorization: 'Bearer ' + token}
        : {Authorization: ''};
}
export const setAuthHeader = (header: IAuthLocalStorage) => {
    localStorage.setItem('auth', JSON.stringify(header));
}

const client = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
});


export const API = {
    thunkPay: createAsyncThunk(
        "cart/pay", async (arg, thunkAPI) => {
            return (await client.get<any>(Curl.payCart, {
                headers: authHeader()
            })).data
        }
    ),
    thunkRegister: createAsyncThunk(
        "auth/register", async (request: RegisterRequest, thunkAPI) => {
            return (await client.post<RegisterResponse>(Curl.register, request)).data

        }
    ),
    thunkLogin: createAsyncThunk(
        "auth/login", async (request: LoginRequest, thunkAPI) => {
            return (await client.post<LoginResponse>(Curl.login, request)).data
        }
    ),
    thunkForgotPassword: createAsyncThunk(
        "auth/forgot-password", async (request: ForgotPasswordRequest, thunkAPI) => {
            return (await client.post<ForgotPasswordResponse>(Curl.forgotPassword, request)).data
        }
    ),
    thunkResetPassword: createAsyncThunk(
        "auth/reset-password", async (request: ResetPasswordRequest, thunkAPI) => {
            return (await client.post<ResetPasswordResponse>(Curl.resetPassword, request)).data
        }
    ),
    thunkGetCart: createAsyncThunk(
        "cart/get-cart", async (request, thunkAPI) => {
            try {
                return (await client.get<CartItem[]>(Curl.getCart, {
                    headers: authHeader()
                })).data
            } catch (e) {
                if (e instanceof AxiosError) {
                    thunkAPI.dispatch(
                        userActions.logout()
                    );
                }
            }
            return [];
        }
    ),
    thunkRemoveProductFromCart: createAsyncThunk(
        "cart/remove-product", async (request: CartItem, thunkAPI) => {
            try {
                return (await client.put<CartItem[]>(Curl.removeProduct, {
                    ...request,
                    quantity: 0
                }, {
                    headers: authHeader()
                })).data
            } catch (e) {
                if (e instanceof AxiosError) {
                    if (e.response?.status === 401) {
                        thunkAPI.dispatch(
                            userActions.logout()
                        );
                    }
                }
            }
            return [];
        }
    ),
    thunkGetAllProducts: createAsyncThunk(
        "product/get-all", async (request, thunkAPI) => {
            try {
                return (await client.get<Product[]>(Curl.getAllProducts, {
                    headers: authHeader()
                })).data
            } catch (e) {
                if (e instanceof AxiosError) {
                    thunkAPI.dispatch(
                        userActions.logout()
                    );
                }
            }
            return [];
        }
    ),
    thunkAddProduct: createAsyncThunk(
        "cart/add-product", async (request: Product, thunkAPI) => {
            try {
                return (await client.post<CartItem[]>(Curl.addProduct, request, {
                    headers: authHeader()
                })).data
            } catch (e) {
                if (e instanceof AxiosError) {
                    thunkAPI.dispatch(
                        userActions.logout()
                    );
                    throw e;
                }
            }
            return [];
        }
    ),
};

export default API;