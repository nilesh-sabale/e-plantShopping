import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () =>
    {
      let tot_amt = 0;
      {cart.map((product) =>
        {
          tot_amt = tot_amt + (Number(product.cost) * (product.quantity));
        })}
        return tot_amt;
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  const handleIncrement = (item) =>
  {
    //console.log("Dispatching here...");
    //console.log("Name:", item.name, "Type:", typeof item.name);
    //console.log("Quantity:", item.quantity, "Type:", typeof item.quantity);
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
    if(item.quantity > 0)
      dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
    else
      handleRemove(item);
  };

  const handleRemove = (item) => {
    dispatch(removeItem({name: item.name, image: item.iamge, cost: item.cost}));
    setAddedToCart((prevState) => ({
      ...prevState,
      [item.name]: false, // Reset the added state when the item is removed
  }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (Number(item.cost) * (item.quantity));
  };
  
  

  return (
    <div className="cart-container">
      
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

