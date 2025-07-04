import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    const total = cart.reduce((sum, item) => {
      let price = 0;
      if (typeof item.cost === 'string') {
        // If it's a string, remove non-numeric characters (like '$') and parse it.
        price = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
      } else if (typeof item.cost === 'number') {
        price = item.cost;
      }

      if (!isNaN(price)) {
        return sum + price * item.quantity;
      }
      return sum;
    }, 0); // The initial value for the sum is 0.
    return total.toFixed(2);
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    // Dispatches the removeItem action to completely remove the item from the cart
    dispatch(removeItem({ name: item.name }));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // The cost can be a string like "$15" or a number like 15.
    // We need to handle both cases to avoid calculation errors.
    let price = 0;
    if (typeof item.cost === 'string') {
      // If it's a string, remove non-numeric characters (like '$') and parse it.
      price = parseFloat(item.cost.replace(/[^0-9.]/g, ''));
    } else if (typeof item.cost === 'number') {
      // If it's already a number, just use it.
      price = item.cost;
    }
    // Calculates the total cost for a single item type
    return !isNaN(price) ? (price * item.quantity).toFixed(2) : '0.00';
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{color: 'black'}}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        )))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
