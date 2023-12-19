// PaymentSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = ({
  id,
  name,
  selectedBatch,
  age,
  monthlyFee,
  paymentStatus,
  expireDate,
}) => {
  return (
    <div className="payment-success">
      <h2>Payment Successful!</h2>
      <p>ID: {id}</p>
      <p>Name: {name}</p>
      <p>Selected Batch: {selectedBatch}</p>
      <p>Age: {age}</p>
      <p>Monthly Fee: {monthlyFee} INR</p>
      <p>Payment Status: {paymentStatus}</p>
      <p>Expire Date: {expireDate}</p>
      <Link to="/">Click here if you're not redirected</Link>
    </div>
  );
};

export default PaymentSuccess;
