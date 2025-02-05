// src/pages/Checkout/Checkout.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, resetCart } from '../../redux/ReducerSlice';
import { useNavigate } from 'react-router-dom';
import "./Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.bazaar.productData);
  const userInfo = useSelector((state) => state.bazaar.userInfo);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = () => {
    // Check if the user is logged in
    if (!userInfo) {
      alert('Please log in to checkout!');
      navigate('/login');
      return;
    }

    // Mock checkout process
    alert('Order Placed Successfully!');
    
    // Reset cart after successful checkout
    dispatch(resetCart());
    navigate('/');
  };

  const handleRemoveItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="cart-items">
        <h3>Your Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={`data:image/jpeg;base64,${item.image}`} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total: ${calculateTotal()}</p>
      </div>

      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={shippingInfo.zipCode}
            onChange={handleInputChange}
            required
          />
        </form>
      </div>

      <div className="checkout-actions">
        <button onClick={handleCheckout}>Confirm Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
