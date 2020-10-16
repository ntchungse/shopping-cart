import React, { useState } from "react";
import formatCurrency from "../../util";
import "./Cart.css";
import Fade from "react-reveal/Fade";
export default function Cart({ cart, removeItem, creatOrder}) {
  const [order, setOrder] = useState({
    checkOut : false,
    name: "",
    address: "",
    email: ""
  });
  const handleInput = (e) =>{
    setOrder({ ...order, [e.target.name] : e.target.value});
  }
  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      cart: cart
    }
    creatOrder(order);
  }
  return (
    <div>
      {cart.length === 0 ? (
        <div className="cart cart__header">Cart is empty</div>
      ) : (
        <div className="cart cart__header">
          You have {cart.length} in the cart{" "}
        </div>
      )}
      <div>
        <div className="cart">
          <Fade left cascade>
          <ul className="cart__items">
            {cart.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title}></img>
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} x {item.count}{" "}
                    <button className="button" onClick={() => removeItem(item)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          </Fade>
        </div>
        {cart.length !== 0 && (
          <div>
          <div className="cart">
            <div className="cart__total">
              Total {" "}
              <div>
                { formatCurrency(
                  cart.reduce((a, b) => a + b.price * b.count, 0)
                )}
              </div>
              <button className="button primary" onClick={() => setOrder({checkOut: true})}>Proceed</button>
            </div>
            
          </div>
          { order.checkOut && (
            <Fade right cascade>
            <div className="cart">
            <form onSubmit={handleOrder}>
              <ul className="form__container">
                <li>
                  <label>Email</label>
                  <input name="email" type="email" required onChange={handleInput} />
                </li>
                <li>
                  <label>Name</label>
                  <input name="name" type="text" required onChange={handleInput} />
                </li>
                <li>
                  <label>Address</label>
                  <input name="address" type="text" required onChange={handleInput} />
                </li>
                <li>
                  <button className="button primary" type="submit">Check out</button>
                </li>
              </ul>
            </form>
            </div>
            </Fade>
          )}
          </div>
        )}
      </div>
    </div>
  );
}
