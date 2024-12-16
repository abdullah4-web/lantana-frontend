import React, { useState } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate

const ResetPassword = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Get the navigation function
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: location.state?.email || '', // Use optional chaining to handle undefined
    newPassword: '',
    confirmPassword: '', // Add confirmPassword field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if newPassword and confirmPassword match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match. Please make sure they match.');
      return;
    }

    try {
      setIsLoading(true);

      // Send email and new password to the password reset route
      const response = await axios.post(`/api/users/reset-password`, formData);

      if (response.status === 200) {
        setMessage(response.data.message);
        // Navigate to the login page on successful reset
        navigate('/login');
      } else {
        setMessage('Password reset failed. Please check your inputs.');
      }
    } catch (error) {
      setMessage('An error occurred while resetting the password.');
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
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
          </Button>{" "}
          <Button variant="outline-secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <div className="mt-3">
            {message && (
              <p className={message.includes('Error') ? 'text-danger' : 'text-success'}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
