import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user-slice";
import {cartSlice} from "./cart-slice";
import {productSlice} from "./product-slice";

export const store = configureStore({
    reducer: {
        auth: userSlice.reducer,
        cart: cartSlice.reducer,
        products: productSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;