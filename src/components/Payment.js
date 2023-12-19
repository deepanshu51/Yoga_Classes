import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentForm from './PaymentForm';

const Payment = () => {
  const location = useLocation();
  const user = location.state;
  // console.log(user );
  const options={
age: user.age,
enrollmentDate: user.enrollmentDate,
enrollmentValidUpto: user.enrollmentValidUpto,
id: user.id,
monthlyFee: user.monthlyFee,
name: user.name,
paymentStatus: user.paymentStatus?"PAID":"PENDING",
selectedBatch: user.selectedBatch
  }

  return <PaymentForm user={options} />;
};

export default Payment;
