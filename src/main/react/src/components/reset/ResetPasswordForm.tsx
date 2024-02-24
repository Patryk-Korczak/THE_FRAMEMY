import React from "react";
import { Spinner} from "react-bootstrap";

interface IResetPasswordForm {
    token: string;
    password: string;
    setPassword: React.ChangeEventHandler<HTMLInputElement>;
    confirmPassword: string;
    setConfirmPassword: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    isLoading: boolean;
}

const ResetPasswordForm: React.FC<IResetPasswordForm> = (props) => {

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (props.password === props.confirmPassword) {
            props.onSubmit(event);
        }
    }

    const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        props.setPassword(e);
    };

    const confirmPasswordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        props.setConfirmPassword(e);
    };

    return (
        <div className="register-container d-flex">
            <div className="column">
                <h1>Zresetuj hasło</h1>
                <form className="register-block" onSubmit={submitHandler}>
                    <div className="input-container">
                        <label className="form-label" htmlFor="reset-token">Reset Token</label>
                        <input
                            className={`form-control }`}
                            value={props.token}
                            type={"text"}
                            disabled={true}
                            placeholder={"Reset Token"}
                            id="reset-token"/>
                    </div>
                    <div className="input-container">
                        <label className="form-label" htmlFor="password">Hasło</label>
                        <input
                            className={`form-control`}
                            value={props.password}
                            onChange={passwordChangeHandler}
                            type="password"
                            placeholder={"Hasło"}
                            id="password"/>
                    </div>
                    <div className="input-container">
                        <label className="form-label" htmlFor="passwordConfirm">Potwierdź hasło</label>
                        <input
                            className={`form-control`}
                            value={props.confirmPassword}
                            onChange={confirmPasswordChangeHandler}
                            type="password"
                            placeholder={"Potwierdź hasło"}
                            id="passwordConfirm"/>
                    </div>
                    <div className="submit-button-container mt-3">
                        {props.isLoading
                            ? <Spinner animation={"border"}/>
                            : <button className="submit-button" type="submit">Zmień haslo</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPasswordForm;