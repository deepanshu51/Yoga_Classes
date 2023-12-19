// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
      <>
      <div className="homecontent">
      <h3 className='title'>Flex Money Yoga Class</h3>
      <p className='subtitle'>Enroll in our monthly classes and enhance your skills!</p>
      <div>
      <Link to="/enroll" className="btn space1">
        Enroll Now
      </Link>
      </div>
      <div>
      <Link to="/payingLater" className="btn space">
        Pay for previous enrollment
      </Link>
      </div>
      </div>
      </>
  );
};

export default LandingPage;
