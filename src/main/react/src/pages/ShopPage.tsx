import ItemList from "../components/shop-page/shopItemList/ItemList";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../store";
import API from "../api/API";
import {useEffect} from "react";
import {selectIsLoading} from "../store/product-slice";
import {Spinner} from "react-bootstrap";

let firstRender = true;
const ShopPage = () => {
    const isLoading = useSelector(selectIsLoading);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(API.thunkGetAllProducts());
        firstRender = false;
    }, [dispatch]);

    return (
        <>
            {}
            {}
            {!firstRender && isLoading
                ? (
                    <div className="d-flex align-items-center justify-content-center ">
                        <Spinner animation={"border"}/>
                    </div>
                )
                : <ItemList/>
            }
        </>
    );
}

export default ShopPage;