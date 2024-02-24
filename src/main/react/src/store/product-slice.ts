import {createSlice} from "@reduxjs/toolkit";
import API from "../api/API";
import {RootState} from "./index";
import {Product} from "../api/message/Cart";

interface IProductSlice {
    loading: boolean;
    data: {
        items: Product[]
    }
}


const initialState: IProductSlice = {
    loading: false,
    data: {
        items: []
    }
};

export const productSlice = createSlice(
    {
        name: 'products',
        initialState,
        reducers: {
        },
        extraReducers: builder => {

            builder.addCase(
                API.thunkGetAllProducts.pending,
                (state, action) => {
                    state.loading = true;
                }
            );
            builder.addCase(
                API.thunkGetAllProducts.fulfilled,
                (state, action) => {
                    state.data.items = action.payload;
                    state.loading = false;
                }
            );
            builder.addCase(
                API.thunkGetAllProducts.rejected,
                (state, action) => {
                    state.loading = false;
                    console.log(action);
                    if (action.error.code === '401') {
                        localStorage.removeItem('auth');
                    }
                }
            );
        }
    }
);

export const selectProducts = (state: RootState) => state.products.data.items;
export const selectIsLoading = (state: RootState) => state.products.loading;
