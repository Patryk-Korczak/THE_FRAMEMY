import "./login.css"
import * as React from "react";
import {Button, Spinner} from "react-bootstrap";
import {useState} from "react";

export interface ILoginFormProps {
    email: string;
    setEmail: React.ChangeEventHandler<HTMLInputElement>;
    password: string;
    setPassword: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
    clickForgotPassword: () => void;
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm: React.FC<ILoginFormProps> = (props) => {

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const emailRegex = String(e.target.value).toLowerCase().match(EMAIL_REGEX);
        setIsEmailValid(!!emailRegex);
        props.setEmail(e);
    }
    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const strongPassword = String(e.target.value).length > 8;
        setIsPasswordValid(strongPassword);
        props.setPassword(e);
    }

    return (
        <div className="register-container d-flex">
            <div className="column">
                <h1>Zaloguj się</h1>
                <form className="register-block" onSubmit={props.onSubmit}>
                    <div className="input-container">
                        <label className="form-label" htmlFor="email">E-mail</label>
                        <input
                            className={`form-control ${isEmailValid ? '' : 'form-invalid'}`}
                            value={props.email}
                            onChange={emailChangeHandler}
                            onBlur={emailChangeHandler}
                            type="email"
                            placeholder={"Adres email"}
                            id="email"/>
                    </div>
                    <div className="input-container">
                        <label className="form-label" htmlFor="password">Hasło</label>
                        <input
                            className={`form-control ${isPasswordValid ? '' : 'form-invalid'}`}
                            value={props.password}
                            onChange={passwordChangeHandler}
                            type="password"
                            placeholder={"Hasło"}
                            id="password"/>
                    </div>
                    <div className="input-container my-2">
                        <Button variant={"outline-dark"} onClick={() => props.clickForgotPassword()}>Przypomnij haslo</Button>
                    </div>
                    <div className="submit-button-container">
                        {props.isLoading
                            ? <Spinner animation={"border"}/>
                            : <button className="submit-button" type="submit">Zaloguj się</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
