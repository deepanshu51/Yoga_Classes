// PaymentForm.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess";
import axios from "axios";

const PaymentForm = ({ user }) => {
  // console.log(user + "form ");
  const [paymentOption, setPaymentOption] = useState("later");
  const [paymentDetails, setPaymentDetails] = useState({
    userId: 0,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the landing page after 30 seconds if payment is successful
    if (paymentSuccess) {
      const timeoutId = setTimeout(() => {
        navigate("/");
      }, 30000);

      // Clear the timeout on component unmount or if paymentSuccess changes
      return () => clearTimeout(timeoutId);
    }
  }, [paymentSuccess, navigate]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Implement your payment processing logic here based on the chosen option
    if (paymentOption === "now") {
      if (validatePaymentDetails(paymentDetails)) {
        // Process the payment
        if (paymentDetails.userId == user.id) {

          try {
            // Make a request to the backend to process the payment
            
            const response = await axios.post(
              `https://flex-money-yogaclass.onrender.com/payments/${paymentDetails.userId}`
            );
            // console.log(response);
            if (response.data.paymentSuccessful) {
              alert(response.data.successMessage);
              setPaymentSuccess(true);
            } else {
              setPaymentError(response.data.errorOccurred);
            }
          } catch (error) {
            alert("Error processing payment:", error);
            setPaymentError("An error occurred while processing the payment.");
          }
        } else {
          alert("Invalid userId");
        }
        // setPaymentSuccess(true);
      } else {
        alert("Invalid payment details. Please check and try again.");
      }
    } else {
      alert("Payment postponed. You can pay later.");
    }
  };

  const validatePaymentDetails = (details) => {
    // Implement your validation logic for payment details (e.g., card number, expiry date, CVV)
    // Return true if valid, false otherwise
    return (
      details.userId && details.cardNumber && details.expiryDate && details.cvv
    );
  };

  return (
    <div className="payment-form">
      {paymentSuccess ? (
        <PaymentSuccess
          id={user ? user.id : "N/A"}
          name={user ? user.name : "N/A"}
          selectedBatch={user ? user.selectedBatch : "N/A"}
          age={user ? user.age : "N/A"}
          monthlyFee={user ? user.monthlyFee : "N/A"}
          paymentStatus="Success" // Assuming payment is successful
          expireDate="30/12/2023" // Example expiry date
        />
      ) : (
        <>
          <h2 className="title2">Payment Form</h2>
          <p className="pay"><strong>User ID: </strong> {user ? user.id : "N/A"}</p>
          <p className="pay"><strong>Name: </strong> {user ? user.name : "N/A"}</p>
          <p className="pay"><strong>Selected Batch: </strong> {user ? user.selectedBatch : "N/A"}</p>
          <p className="pay"><strong>Monthly Fee: </strong> {user ? user.monthlyFee : "N/A"} INR </p>
          <p className="pay"><strong>Payement Status: </strong> {user ? user.paymentStatus : "N/A"}</p>

          <form onSubmit={handlePaymentSubmit} className="form2">
            <label>
              Payment Option:
              <select
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
              >
                <option value="later">Pay Later</option>
                <option value="now">Pay Now</option>
              </select>
            </label>
            {paymentOption === "now" && (
              <div>
                <label>
                  UserId:
                  <input
                    type="number"
                    value={paymentDetails.userId}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        userId: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Card Number:
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  Expiry Date:
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </label>
                <label>
                  CVV:
                  <input
                    type="text"
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                  />
                </label>
                <button type="submit">Submit Payment</button>
              </div>
            )}
            {paymentOption === "later" && (
              <div>
                <p>
                  Payment can be made later. No action required at the moment.
                </p>
                <Link to="/">
                  <button className="buttoncolor">Are you ready for Pay Later?</button>
                </Link>
              </div>
            )}
            {paymentError && <p style={{ color: "red" }}> {paymentError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default PaymentForm;
