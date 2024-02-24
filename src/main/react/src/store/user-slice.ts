import {createSlice} from "@reduxjs/toolkit";
import {ROLE} from "../api/message/Register";
import API, {IAuthLocalStorage, setAuthHeader} from "../api/API";
import {RootState} from "./index";

interface IUserSlice {
    loading: boolean;
    data: {
        email: string;
        roles: ROLE[];
        authenticated: boolean
    }
}


const authLocalStorage: IAuthLocalStorage = JSON.parse(localStorage.getItem('auth') ?? "{}");

const initialState: IUserSlice = {
    loading: false,
    data: {
        email: authLocalStorage.email,
        roles: authLocalStorage.roles,
        authenticated: !!authLocalStorage.token
    }
};

export const userSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            logout: state => {
                state.data = {
                    email: "",
                    roles: [],
                    authenticated: false
                }
                setAuthHeader(
                    {
                        email: "",
                        roles: [],
                        token: "",
                    } as IAuthLocalStorage
                );
            }
        },
        extraReducers: builder => {
            /**
             *
             *
             * REGISTER
             */
            builder.addCase(
                API.thunkRegister.pending,
                (state) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkRegister.fulfilled,
                (state, action) => {
                    state.data = {
                        email: action.payload?.email ?? "",
                        roles: action.payload?.roles ?? [],
                        authenticated: true
                    };
                    setAuthHeader(
                        {
                            email: action.payload?.email ?? "",
                            roles: action.payload?.roles ?? [],
                            token: action.payload?.jwtToken ?? "",
                        } as IAuthLocalStorage
                    );
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkRegister.rejected,
                (state) => {
                    state.loading = false;
                }
            );

            builder.addCase(
                API.thunkLogin.pending,
                (state) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkLogin.fulfilled,
                (state, action) => {
                    state.data = {
                        email: action.payload.email ?? "",
                        roles: action.payload?.roles ?? [],
                        authenticated: true
                    };
                    setAuthHeader(
                        {
                            email: action.payload?.email ?? "",
                            roles: action.payload?.roles ?? [],
                            token: action.payload?.jwtToken ?? "",
                        } as IAuthLocalStorage
                    );
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkLogin.rejected,
                (state) => {
                    state.loading = false;
                }
            );

            builder.addCase(
                API.thunkForgotPassword.pending,
                (state) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkForgotPassword.fulfilled,
                (state, action) => {
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkForgotPassword.rejected,
                (state) => {
                    state.loading = false;
                }
            );

            builder.addCase(
                API.thunkResetPassword.pending,
                (state) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkResetPassword.fulfilled,
                (state, action) => {
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkResetPassword.rejected,
                (state) => {
                    state.loading = false;
                }
            );


        }
    }
);

export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectAuth = (state: RootState) => state.auth.data;

export const userActions = userSlice.actions;