// EnrollmentForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EnrollmentForm({ onEnroll }) {
  const navigate  = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  const batches = ['6-7AM', '7-8AM', '8-9AM', '5-6PM'];

  const handleEnroll =  async() => {

    // Validate name, age, and selectedBatch here
    const isValid =
      name.trim() !== '' && age >= 18 && age <= 65 && selectedBatch !== '';

    if (isValid) {
      // Calculate monthly fee
      const monthlyFee = 500;
      // const id ="!@#1214";
      const enrollmentData = {
        name,
        age: parseInt(age),
        selectedBatch,
        monthlyFee,
      };
      try {
        // Make API call to enroll user
        const response = await axios.post('https://flex-money-yogaclass.onrender.com/enroll', enrollmentData);

        // Call the onEnroll function with the enrolled user data
        // onEnroll(response.data);

        // Navigate to the payment page
        navigate('/payment' ,{state :response.data});
      }catch (error) {
        console.error('Enrollment failed:', error);
        alert('Enrollment failed. Please try again.');
      }

      // // Call the onEnroll function with enrollment data
      // onEnroll({ name, age, selectedBatch, monthlyFee,id });
      // navigate('/payment');
    } else {
      alert('Invalid name, age, or batch selection.');
    }
  };

  return (
    <>
    <div className='enrollform'>
      <h2 className='title1'>Enrollment Form</h2>
      <label className='lab'>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className='inp'
        />
      </label>
      <label className='lab'>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          className='inp1'
        />
      </label>
      <label className='lab'>
        Select Batch:
        <select
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
          className='inp2'
          required
        >
          <option value="null" selected hidden>Select Batch</option>
          {batches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleEnroll} className='but space'>Enroll</button>
      </div>
    </>
  );
}

export default EnrollmentForm;
