import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      // Send a request to reset the password using the provided email
      const response = await axios.post(`/api/users/forgot-password`, data);

      // Display success message using react-toastify
      toast.success(response.data.message);

      if (response.status === 200) {
        // Pass the email data when navigating to '/otp'
        navigate('/otp', { state: { email: data.email } }); // Include email in the state
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      // Display error message using react-toastify
      toast.error('Error resetting password. Please try again.');
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
          <span className="text-primary">Reset</span> Password
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email', { required: true })}
            />
            {errors.email && <p className="text-danger">Email is required.</p>}
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
          </Button>{" "}
          <Button variant="outline-secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
