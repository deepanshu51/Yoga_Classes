import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PayingLater = () => {
  const navigate = useNavigate();
  const [userId, setUserID] = useState(0);

  const handlePayLater = async (e) => {
    e.preventDefault();

    try {
      const user = await axios.get(`https://flex-money-yogaclass.onrender.com/enroll/${userId}`);

      if (user.data !== null) {
        if (user.data.paymentStatus !== null) {
          alert("You have already made the payment ");
          navigate("/");
        } else navigate("/payment", { state: user.data });
      } else {
        alert("userId invalid");
      }
    } catch (error) {
      alert("Error fetching user:", error);
    }
  };

  return (
    <div>
      <h2>Payment for Previous Enrollment</h2>

      <label>
        User Id:
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserID(e.target.value)}
          placeholder="Enter your unique User Id"
        />
      </label>
      <button onClick={handlePayLater}>Proceed To Payment</button>
      {/* </div> */}
      {/* // </div> */}
    </div>
  );
};

export default PayingLater;
