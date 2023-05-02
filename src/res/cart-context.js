import React from "react";

const CartContext = React.createContext({
    items:[],
    productAmount:0,
    gstAmount:0,
    vatAmount:0,
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearall: () => {},
});

export default CartContext;