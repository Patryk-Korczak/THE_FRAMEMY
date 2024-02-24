import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import CustomPage from "./pages/CustomPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import React, {useEffect} from "react";
import Layout from "./Layout";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "./store";
import API from "./api/API";
import {selectAuth} from "./store/user-slice";
import ResetPage from "./pages/ResetPage";
import Cart from "./components/cart/Cart";


const App = () => {

    const auth = useSelector(selectAuth)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        auth.authenticated && dispatch(API.thunkGetCart());
    }, [auth, dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path={"/shop"} element={<ShopPage/>}/>
                    <Route path={"/about"} element={<AboutPage/>}/>
                    <Route path={"/design"} element={<CustomPage/>}/>
                    <Route path={"/register"} element={<RegisterPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/reset-password/:token"} element={<ResetPage/>}/>
                    <Route path={"/cart"} element={<Cart/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
