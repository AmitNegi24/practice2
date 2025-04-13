import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, resetCart } from '../../redux/ReducerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import "./checkout.css";

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

  useEffect(() => {
    // Check if token is valid and not expired
    const token = localStorage.getItem('userToken');
    console.log("Token from localStorage: ", token);
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // const decodedToken = (token);
        console.log("Decoded token: ", decodedToken);

        const currentTime = Date.now() / 1000; // Get current time in seconds
        if (decodedToken.exp < currentTime) {
          alert('Session expired, please log in again!');
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      } catch (error) {
        console.error("Error decoding token: ", error);
        alert('Invalid token. Please log in again.');
        navigate('/login');
      }
    } else {
      console.log("No token found.");
      navigate('/login');
    }
  }, [navigate]);

  // Calculate total price
  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return '0.00';
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = async () => {
    // Check if the user is logged in
    if (!userInfo) {
      alert('Please log in to checkout!');
      navigate('/login');
      return;
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('No authentication token found, please log in.');
        navigate('/login');
        return;
      }

      console.log("TOKEN = ", token);

      // API request to place order
      const response = await axios.post(
        'http://localhost:8080/api/checkout-api/checkout',
        {
          cartItems,    // Cart items
          shippingInfo, // Shipping info
          totalAmount: calculateTotal(), // Total amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in headers
            'Content-Type': 'application/json',
          },
        },
      );

      console.log("Checkout Response:", response);

      // Handle success response
      if (response.status === 200) {
        alert('Order Placed Successfully!');
        dispatch(resetCart()); // Clear the cart after order success
        navigate('/');
      }
    } catch (error) {
      console.error('Checkout failed:', error.response ? error.response.data : error.message);
      alert('Checkout failed. Please try again.');
    }
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
