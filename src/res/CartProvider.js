import CartContext from "./cart-context.js";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  gstAmount: 0,
  vatAmount: 0,
  productAmount: 0,
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedgstAmount = state.gstAmount + ( action.item.price * 0.18 ) * action.item.quantity;
    const updatedvatAmount = state.vatAmount + ( action.item.price * 0.12 ) * action.item.quantity;
    const updatedproductAmount = state.productAmount + action.item.price * action.item.quantity;
    const updatedtotalAmount = updatedproductAmount + updatedgstAmount + updatedvatAmount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      productAmount: updatedproductAmount,
      gstAmount: updatedgstAmount,
      vatAmount: updatedvatAmount,
      totalAmount: updatedtotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedgstAmount = state.gstAmount - ( existingItem.price * 0.18 );
    const updatedvatAmount = state.vatAmount - ( existingItem.price * 0.12 );
    const updatedproductAmount = state.productAmount - existingItem.price;
    const updatedtotalAmount = updatedproductAmount + updatedgstAmount + updatedvatAmount;
    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      productAmount: updatedproductAmount,
      gstAmount: updatedgstAmount,
      vatAmount: updatedvatAmount,
      totalAmount: updatedtotalAmount,
    };
  }

  if (action.type === "CLEARALL") {
    return {
      items: [],
      productAmount: 0,
      gstAmount: 0,
      vatAmount: 0,
      totalAmount: 0,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearAllItemsFromCartHandler = () => {
    dispatchCartAction({ type: "CLEARALL" });
  };

  const cartContext = {
    items: cartState.items,
    gstAmount: cartState.gstAmount,
    vatAmount: cartState.vatAmount,
    productAmount: cartState.productAmount,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearall: clearAllItemsFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;