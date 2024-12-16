import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const Login = ({ children }) => {
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/users/login`, data);
      const userData = response.data;
  
      // Ensure your server returns a token upon successful login
      const token = userData.token;
  
      // Fetch notifications based on user.isAdmin
      const notificationResponse = await axios.get(
        userData.isAdmin ? `/api/notifications/admin` : `/api/notifications/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      const notifications = notificationResponse.data;
  
      // Store user data and notifications in local storage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('notifications', JSON.stringify(notifications));
  
      dispatch({ type: 'SET_USER', payload: userData });
      dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
  
      // Show success toast
      toast.success('Login Successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        onClose: () => {
          navigate('/properties');
        },
      });
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Username or Password incorrect.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleCancel = () => {
    // Navigate to /login when clicking Cancel
    navigate('/');
  };
  const ogImage = 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1701269136/swa8ktluihucqayhmhse.png'; // Replace with your actual image URL
  const ogUrl = 'https://example.com/your-page';

  return (
    <>
     <Helmet>
    <title>Login</title>
    <meta name="description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
    <Container className="pt-9">
      <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400 }}>
        {children}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="h4 bold text-center text-uppercase">
            <span className="text-primary">Log</span> in
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email', { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password', { required: true })}
            />
          </Form.Group>
          <Button
            as={Link}
            to="/register"
            variant="link"
            className="mb-3 d-block px-0 text-decoration-none text-start"
          >
            Don't have an account? Create now.
          </Button>
          <Link to="/forgotpassword" className="mb-3 d-block text-decoration-none text-start">
            Forgot Password?
          </Link>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Log in'}
          </Button>{" "}
          <Button variant="outline-secondary" type="button" onClick={handleCancel}>
            Cancel
          </Button>
        </form>
      </div>
      <div className="mt-4">
        {/* GoogleSignIn component */}
      </div>
      <ToastContainer autoClose={3000} />
    </Container>
    </>
  );
};

export default Login;
