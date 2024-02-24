import "./shopItem.css"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../store";
import API from "../../../api/API";
import {selectAuth} from "../../../store/user-slice";

const Item: React.FC<any> = (props) => {

    const [btnText, setBtnText] = useState("Add");
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const auth = useSelector(selectAuth);

    const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setDisabled(true);
        dispatch(
            API.thunkAddProduct(props.item)
        ).then(() => {
            setBtnText("Done");
            setDisabled(false);
            setTimeout(() => {
                setBtnText("Add");
            }, 2000);
        }).catch((e) => {
            setBtnText("Error");
            setDisabled(false);
            setTimeout(() => {
                setBtnText("Add");
            }, 2000);
        });
    };

    return (
        <div className={"container shop-card-container"}>
            <img className={"shop-item-image"} src={props.item.imageUrl} alt={props.item.title}/>
            <h4 className={"shop-item-title"}>{props.item.title}</h4>
            <a className={"shop-item-price"}>{props.item.price} PLN</a>
            {
                auth.authenticated && (
                    <button className={"btn btn-outline-dark"} onClick={onClick} disabled={disabled}>{btnText}</button>
                )
            }
        </div>
    );
}

export default Item;