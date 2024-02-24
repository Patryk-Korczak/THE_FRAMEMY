import Item from "../shopItem/Item";
import "./ItemList.css"
import {useSelector} from "react-redux";
import {selectProducts} from "../../../store/product-slice";

const ItemList = () => {

    const _items = useSelector(selectProducts);
    const input = document.getElementsByClassName("search-bar-input")[0]

    return (
        <>
            <div className="padding">
                <div className={"container shop-item-container"}>
                    {
                        _items.map((item, index) => {
                        return <Item
                            key={index + item.title}
                            item={item}/>;
                    })}
                </div>
            </div>
        </>
    );
}

export default ItemList;