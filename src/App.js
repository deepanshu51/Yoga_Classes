// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import EnrollmentForm from './components/EnrollmentForm';
// import PaymentForm from './PaymentForm';
import PayingLater from './components/PayingLater';
import Payment from './components/Payment';

function App() {
  // const navigate = useNavigate();
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/enroll" element={<EnrollmentForm  />} />
          <Route
            path="/payment"
            element={<Payment/>}
          />
           <Route
            path="/payingLater"
            element={<PayingLater />}
          />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
