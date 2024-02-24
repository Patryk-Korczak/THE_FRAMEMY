import "./login.css"
import * as React from "react";
import {useState} from "react";
import {Spinner} from "react-bootstrap";

export interface ILoginFormProps {
    email: string;
    setEmail: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
    message: string;
}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ForgotPasswordForm: React.FC<ILoginFormProps> = (props) => {

    const [isEmailValid, setIsEmailValid] = useState(true);

    const emailChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const emailRegex = String(e.target.value).toLowerCase().match(EMAIL_REGEX);
        setIsEmailValid(!!emailRegex);
        props.setEmail(e);
    }

    const isMessage = props.message !== null && props.message !== undefined && props.message.length > 0;

    return (
        <div className="register-container d-flex">
            {
                isMessage
                    ? props.message
                    : (
                        <div className="column">
                            <h1>Przypomnij hasło</h1>
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
                                <div className="submit-button-container">
                                    {
                                        props.isLoading ? <Spinner animation={"border"}/>
                                            : <button className="submit-button" type="submit">Przypomnij hasło</button>
                                    }
                                </div>
                            </form>
                        </div>
                    )
            }
        </div>
    );
}

export default ForgotPasswordForm;
