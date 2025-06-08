import React from "react";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  return (
    <div className="success-body">
      <div className="card1">
        <div className="icon-container1">
          <i className="checkmark">✓</i>
        </div>
        <h1 className="success-heading">Success</h1>
        <p className="success-message">
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </p>
        <a href="/" className="success-button">Go to Home</a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
