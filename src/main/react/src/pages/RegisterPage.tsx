import * as React from "react";
import RegisterForm from "../components/register/RegisterForm";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import authAPI from "../api/API";
import {useNavigate} from "react-router-dom";
import {selectAuth, selectIsLoading} from "../store/user-slice";


const RegisterPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector(selectAuth);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        auth.authenticated && (
            navigate("/shop")
        );
    }, [auth.authenticated, navigate]);

    const passwordConfirmationChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPasswordConfirmation(event.target.value);
    };
    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };
    const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setEmail(event.target.value);
    };

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        dispatch(
            authAPI.thunkRegister({
                email, password
            })
        ).then(() => {
            window.scroll({top: 0, behavior: "smooth"});
            setTimeout(() => {
                auth.authenticated && (
                    navigate("/shop")
                );
            }, 100);
        })
    };

    return <RegisterForm
        email={email}
        setEmail={emailChangeHandler}
        password={password}
        setPassword={passwordChangeHandler}
        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={passwordConfirmationChangeHandler}
        onSubmit={submitHandler}
        isLoading={isLoading}
    />;

}

export default RegisterPage;