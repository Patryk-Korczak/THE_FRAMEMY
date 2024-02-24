import "./register.css"
import * as React from "react";
import {Spinner} from "react-bootstrap";

export interface IRegisterFormProps {
    email: string;
    setEmail: React.ChangeEventHandler<HTMLInputElement>;
    password: string;
    setPassword: React.ChangeEventHandler<HTMLInputElement>;
    passwordConfirmation: string;
    setPasswordConfirmation: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean
}

const RegisterForm: React.FC<IRegisterFormProps> = (props) => {
    return (
        <div className="register-container">
            <div className="column">
                <h1>Zarejestruj się</h1>
                <form className="register-block" onSubmit={props.onSubmit}>
                    <div className="input-container">
                        <label className="form-label" htmlFor="email">E-mail</label>
                        <input
                            className="form-control"
                            value={props.email}
                            onChange={props.setEmail}
                            type="email"
                            placeholder={"Adres email"}
                            id="email"/>
                    </div>
                    <div className="input-container">
                        <label className="form-label" htmlFor="password">Hasło</label>
                        <input
                            className="form-control"
                            value={props.password}
                            onChange={props.setPassword}
                            type="password"
                            placeholder={"Hasło"}
                            id="password"/>
                    </div>
                    <div className="input-container">
                        <label className="form-label" htmlFor="password-confirmation">Powtórz hasło</label>
                        <input
                            className="form-control"
                            value={props.passwordConfirmation}
                            onChange={props.setPasswordConfirmation}
                            type="password"
                            placeholder={"Potwierdź hasło"}
                            id="password-confirmation"/>
                    </div>
                    <div className="submit-button-container">
                        {props.isLoading
                            ? <Spinner animation={"border"}/>
                            : <button className="submit-button" type="submit">Zarejestruj</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
