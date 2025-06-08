import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, resetCart } from '../../redux/ReducerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import "./checkout.css";
import { toast } from 'react-toastify';

const Checkout = () => {
  const cartItems = useSelector((state) => state.bazaar.productData);
  const userInfo = useSelector((state) => state.bazaar.userInfo);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', city: '', zipCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          alert("Session expired, please log in again.");
          localStorage.removeItem('userToken');
          navigate('/login');
        }
      } catch (e) {
        alert("Invalid token. Please log in again.");
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return '0.00';
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleCheckout = async () => {
    if (!userInfo) {
      alert("Please log in to checkout.");
      navigate('/login');
      return;
    }

    const token = localStorage.getItem('userToken');
    if (!token) {
      alert("No authentication token found.");
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/checkout-api/checkout',
        {
          cartItems,
          shippingInfo,
          totalAmount: calculateTotal(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;
      const orderId = data.match(/ID: (.+?) and Status/)[1];
      console.log("ORDER ID ==", orderId)

      if (paymentMethod === 'UPI') {
        if (!upiId || !upiId.includes('@')) {
          toast.error("Please enter a valid UPI ID.");
          return;
        }

        await axios.post(
          `http://localhost:8080/api/payment-api/confirm?orderId=${orderId}&upiId=${upiId}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (paymentMethod === 'RAZORPAY') {
        const razorRes = await axios.post(
          `http://localhost:8080/api/payment-api/create-razorpay-order?orderId=${orderId}`,
          {},
          {
            headers:
            {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const { id: razorpayOrderId, amount, currency } = razorRes.data;

        const options = {
          key: "rzp_test_uq2aglezmnBSYp",
          amount,
          currency,
          name: "eKart",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async function (response) {
            try {
              await axios.post(
                "http://localhost:8080/api/payment-api/verify-payment",
                {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  ekartOrderId: orderId,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              toast.success("🎉 Payment Successful!");
              dispatch(resetCart());
              navigate('/PaymentSuccess');
            } catch (err) {
              toast.error("❌ Payment Verification Failed.");
            }
          },
          theme: { color: "#121212" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }

      toast.success("🎉 Order placed successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      dispatch(resetCart());
      navigate('/PaymentSuccess');
    } catch (err) {
      console.error(err);
      toast.error("❌ Checkout failed. Try again.");
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
          <input type="text" name="name" placeholder="Full Name" value={shippingInfo.name} onChange={handleInputChange} required />
          <input type="text" name="address" placeholder="Shipping Address" value={shippingInfo.address} onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleInputChange} required />
          <input type="text" name="zipCode" placeholder="Zip Code" value={shippingInfo.zipCode} onChange={handleInputChange} required />
        </form>
      </div>

      <div className="payment-method">
        <h3>Payment Method</h3>
        <label>
          <input type="radio" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
          Cash on Delivery
        </label>
        <label>
          <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
          UPI Payment
        </label>
        <label>
          <input type="radio" value="RAZORPAY" checked={paymentMethod === 'RAZORPAY'} onChange={() => setPaymentMethod('RAZORPAY')} />
          Razorpay
        </label>

        {paymentMethod === 'UPI' && (
          <input
            type="text"
            placeholder="Enter your UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{ marginTop: "10px" }}
          />
        )}
      </div>

      <div className="checkout-actions">
        <button onClick={handleCheckout}>Confirm Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;
