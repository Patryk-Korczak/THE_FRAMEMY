import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../store/cart-slice";
import {AppDispatch} from "../../store";
import {CartItem} from "../../api/message/Cart";
import API from "../../api/API";
import Space from "../shared/linebreak/Space";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { PayPalButton } from "react-paypal-button-v2";


function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function subtotal(items: readonly CartItem[]) {
    return items.map(({ product }) => product.price).reduce((sum, i) => sum + i, 0);
}



export default function SpanningTable() {
    const items = useSelector(selectCart);
    const dispatch = useDispatch<AppDispatch>();
    const invoiceSubtotal = subtotal(items);
    const delivery = 20;
    const getDeliveryPrice = () => {
        if(items.length > 0) {
            return delivery;
        } else {
            return 0;
        }
    }
    const invoiceTotal = getDeliveryPrice() + invoiceSubtotal;

    function clearOne(item: CartItem) {
        dispatch(
            API.thunkRemoveProductFromCart(
                item
            )
        );
    }
    const clearCart = () => {
        items.forEach(clearOne)
    }

    function payCart() {
        dispatch(API.thunkPay);
        alert("Zamówienie przekazane do realizacji.");
        items.forEach(clearOne)
    }



    return (
        <>
            <h1>Koszyk</h1>
            <Button variant="contained" onClick={() => clearCart()}>Wyczyść koszyk</Button>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={4}>
                                Szczegóły zamówienia
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell>Opis</TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">Cena</TableCell>
                            <TableCell align="right">Suma</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.product.title}>
                                <TableCell>{item.product.title}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{item.product.price}</TableCell>
                                <TableCell align="right">{ccyFormat(item.product.price)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell rowSpan={3}/>
                            <TableCell colSpan={2}>Cena przedmiotów</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Opłata za wysyłkę</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right">{ccyFormat(getDeliveryPrice())}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Suma do zapłaty</TableCell>
                            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Space></Space>
            <h1>Dane do dostawy</h1>
            <TextField
                required
                id="imie"
                label="Imię"
            />
            <TextField
                required
                id="nazwisko"
                label="Nazwisko"
            />
            <TextField
                required
                id="miasto"
                label="Miasto"
            />
            <TextField
                required
                id="kp"
                label="Kod pocztowy"
            />
            <TextField
                required
                id="ulica"
                label="Ulica"
            />
            <TextField
                required
                id="nd"
                label="Numer domu"
            />
            <Space></Space>
            <h1>Dokonaj płatości</h1>
            <Button variant="contained" onClick={() => payCart()}>Zapłać</Button>
            <div>
                <PayPalButton
                    amount={invoiceTotal}
                    onSuccess={() => {
                    }}
                    options={{
                    clientId: "Aexqbkt-PpHleWWFRC_gmzovK5LrzHrmhuqYTf_nJ5gyhJfURH1PBODoKXHN0lakwELJ4GWcp7nHKKAn",
                }}
                    />
            </div>
        </>
    );
}