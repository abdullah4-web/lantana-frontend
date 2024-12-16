import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('contactnumber', data.contactnumber);
      formData.append('picture', data.picture[0]); // Ensure 'picture' matches your input name attribute

      const response = await axios.post(`/api/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Registered Successfully');
        reset(); // Reset the form fields
        navigate('/login');
      } else {
        toast.error('Error signing up');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Error signing up');
    } finally {
      setIsLoading(false);
    }
  };
  const ogImage = 'https://res.cloudinary.com/dtcmf6iqn/image/upload/v1701269136/swa8ktluihucqayhmhse.png'; // Replace with your actual image URL
  const ogUrl = 'https://example.com/your-page';
  return (
    <>
    <Helmet>
    <title>Register</title>
    <meta name="description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:title" content="Lantana Marketing Limited" />
    <meta property="og:description" content="Lantana Marketing Limited - Your best place to sell and rent your property and vehicles" />
    <meta property="og:image" content={ogImage} />
    <meta property="og:url" content={ogUrl} />
  </Helmet>
    <Container className="py-8">
      <div className="border p-4 mx-auto my-5 shadow-sm" style={{ maxWidth: 400 }}>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="h4 bold text-center text-uppercase">
            <span className="text-primary">Register</span> now
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              {...register('name', { required: true })}
            />
          </Form.Group>
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
          <Form.Group className="mb-3">
            <Form.Label>Contact number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Contact number"
              {...register('contactnumber', { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register('picture', { required: true })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Do you agree with terms and conditions?"
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <BeatLoader size={8} color="white" />
            ) : (
              'Sign up'
            )}
          </Button>{" "}
          <Button variant="outline-secondary" type="reset" disabled={isLoading}>
            Cancel
          </Button>
        </form>
      </div>
      <div className="mt-4"></div>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
    </>
  );
};

export default Register;
