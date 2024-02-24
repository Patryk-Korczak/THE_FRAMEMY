import {createSlice} from "@reduxjs/toolkit";
import API from "../api/API";
import {RootState} from "./index";
import {CartItem} from "../api/message/Cart";

interface ICartSlice {
    loading: boolean;
    data: {
        items: CartItem[]
    }
}


const initialState: ICartSlice = {
    loading: false,
    data: {
        items: []
    }
};

export const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
        },
        extraReducers: builder => {

            builder.addCase(
                API.thunkGetCart.pending,
                (state, action) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkGetCart.fulfilled,
                (state, action) => {
                    state.data.items = action.payload;
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkGetCart.rejected,
                (state, action) => {
                    state.loading = false;
                    console.log(action);
                    if (action.error.code === '401') {
                        localStorage.removeItem('auth');
                    }
                }
            );

            builder.addCase(
                API.thunkRemoveProductFromCart.pending,
                (state, action) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkRemoveProductFromCart.fulfilled,
                (state, action) => {
                    state.data.items = action.payload;
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkRemoveProductFromCart.rejected,
                (state, action) => {
                    state.loading = false;
                }
            );

            builder.addCase(
                API.thunkAddProduct.pending,
                (state, action) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkAddProduct.fulfilled,
                (state, action) => {
                    console.log(action.payload);
                    state.data.items = action.payload;
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkAddProduct.rejected,
                (state, action) => {
                    state.loading = false;
                }
            );


        }
    }
);

export const selectCart = (state: RootState) => state.cart.data.items;
