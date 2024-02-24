import * as React from "react";
import {useEffect, useState} from "react";
import LoginForm from "../components/login/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectIsLoading} from "../store/user-slice";
import {useNavigate} from "react-router-dom";
import authAPI from "../api/API";
import {AppDispatch} from "../store";
import ForgotPasswordForm from "../components/login/ForgotPasswordForm";


const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [message, setMessage] = useState("");

    const auth = useSelector(selectAuth);
    const isLoading = useSelector(selectIsLoading);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        auth.authenticated && (
            navigate("/shop")
        );
    }, [auth.authenticated, navigate]);


    const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    };

    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };
    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (forgotPassword) {
            dispatch(
                authAPI.thunkForgotPassword({
                    addressEmail: email
                })
            ).then(() => {
                setMessage(`Wiadomość wysłana na  ${email}.`);
                setTimeout(
                    () => {
                        setForgotPassword(false);
                        setMessage("");
                    }, 5000
                )
            });
        } else {
            dispatch(
                authAPI.thunkLogin({
                    email, password
                })
            ).then(() => {
                window.scroll({top: 0, behavior: "smooth"});
                setTimeout(() => {
                    auth.authenticated && (
                        navigate("/shop")
                    );
                }, 100);
            });
        }
    };

    return (
        <>
            {forgotPassword
                ? <ForgotPasswordForm
                    email={email}
                    setEmail={emailChangeHandler}
                    onSubmit={submitHandler}
                    isLoading={isLoading}
                    message={message}
                />
                : <LoginForm
                    email={email}
                    setEmail={emailChangeHandler}
                    password={password}
                    setPassword={passwordChangeHandler}
                    onSubmit={submitHandler}
                    isLoading={isLoading}
                    clickForgotPassword={() => setForgotPassword(true)}
                />
            }
        </>
    );

}

export default LoginPage;