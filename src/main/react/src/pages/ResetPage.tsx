import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth, selectIsLoading} from "../store/user-slice";
import {useNavigate, useParams} from "react-router-dom";
import {AppDispatch} from "../store";
import ResetPasswordForm from "../components/reset/ResetPasswordForm";
import API from "../api/API";


const ResetPage = () => {
    const params = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [message, setMessage] = useState("");

    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector(selectAuth);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        auth.authenticated && (
            navigate("/shop")
        );
    }, [auth.authenticated, navigate]);

    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPassword(event.target.value);
    };
    const passwordConfirmChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setPasswordConfirm(event.target.value);
    };


    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        dispatch(
            API.thunkResetPassword(
                {
                    token: params.token ?? "",
                    password: password
                }
            )
        ).then(
            () => {
                window.scroll({top: 0, behavior: "smooth"});
                setTimeout(() => {
                    navigate("/login");
                }, 100);
            },
            (er) => {
                console.log(er);
            }
        );
    };

    return (
        <ResetPasswordForm
            token={params.token ?? ""}
            password={password}
            setPassword={passwordChangeHandler}
            confirmPassword={passwordConfirm}
            setConfirmPassword={passwordConfirmChangeHandler}
            onSubmit={submitHandler}
            isLoading={isLoading}
        />
    );

}

export default ResetPage;