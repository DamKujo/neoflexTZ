import React from "react";
import AppContext from "../context";

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.totalPrice + sum, 0);
    // const totalPrice = result;
    const total = cartItems.length;

    return{ cartItems, setCartItems, totalPrice, total};
}
