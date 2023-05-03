import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  // const gstPrice = `$${((props.price * 0.18) * props.quantity).toFixed(2)}`;
  // const vatPrice = `$${((props.price * 0.12) * props.quantity).toFixed(2)}`;

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}> 
          <span className={classes.price}>Amount: {price}</span>
          <span className={classes.quantity}>x {props.quantity}</span>
        </div>
        {/* <div className={classes.summary}> 
          <span className={classes.price}>GST(18%): {gstPrice}</span>
        </div>
        <div className={classes.summary}> 
          <span className={classes.price}>VAT(12%): {vatPrice}</span>
        </div> */}
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;