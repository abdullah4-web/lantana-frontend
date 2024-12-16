import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Access the email value from the location state
  const email = location.state?.email || '';

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      
      // Send OTP and email to the OTP verification route
      const response = await axios.post(`/api/users/verify-otp`, {
        otp: data.otp,
        email: email, // Use the email value from the location state
      });

      if (response.status === 200) {
        // Navigate to the ResetPassword component
        navigate('/resetpassword', { state: { email } });
      } else {
        // Handle failure
        if (response.data.message === 'User not found') {
          setMessage('User not found. Please check your email and try again.');
        } else {
          setMessage('Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Error verifying OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleCancel = () => {
    // Navigate to /login when clicking Cancel
    navigate('/login');
  };
  return (
    <Container className="pt-8">
      <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400 }}>
        <div className="h4 bold text-center text-uppercase">
          <span className="text-primary">Verify Your</span> OTP 
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              type="text"
              name="otp"
              placeholder="Enter OTP"
              {...register('otp', { required: true })}
            />
          </Form.Group>

       
      
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Submit'}
          </Button>{" "}
          <Button variant="outline-secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <div className="mt-3">
            {message && <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>{message}</p>}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Otp;
