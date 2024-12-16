// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select'; // Import react-select

const AddAdminProperty = () => {
  const { state } = useUserContext();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    for: 'sale',
    category: 'plot',
    price: 0,
    area: '',
    location: '',
    address: '',
    images: [],
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from the API
    axios
      .get(`/api/locations`)
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      imageArray.push(files[i]);
    }
    setFormData({ ...formData, images: imageArray });
  };

  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption ? selectedOption.value : '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append('images', formData.images[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/properties/addpropertyasadmin`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setMessage('Property added successfully');
        setFormData({
          title: '',
          description: '',
          for: 'sale',
          category: 'plot',
          price: 0,
          area: '',
          location: '', // Clear the location on success
          address: '',
          images: [],
        });
      } else {
        setMessage('Failed to add property');
      }
    } catch (error) {
      setMessage('Error adding property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="pt-1">
      <div className="border p-3 mx-auto my-4 shadow-sm" style={{ maxWidth: 400 }}>
        <h2 className="bold text-center text-uppercase">Add New Property </h2>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name of The Property</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description / Define Your Property</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Please describe or define your property here..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adding Property For</Form.Label>
            <Form.Control
              as="select"
              name="for"
              value={formData.for}
              onChange={handleInputChange}
              
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Choose Catagory of Property</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="plot">Plot</option>
              <option value="house">House</option>
              <option value="shop">Shop</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="apartment">Apartment</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price of the Property In PKR</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Property Size in Sqft</Form.Label>
            <Form.Control
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              placeholder='Size ...'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select the Property Location</Form.Label>
            <Select
              options={locations.map((location) => ({ value: location, label: location }))}
              isClearable
              isSearchable
              placeholder="Select Location"
              value={locations.find((loc) => loc.value === formData.location)}
              onChange={handleLocationChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Add Complete Address of the Property</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images include Only 10 </Form.Label>
            <Form.Control
              type="file"
              name="images"
              accept="image/*"
              multiple // Allow multiple file selection
              onChange={handleImageChange}
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Add Property'}
          </Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Container>
  );
};

export default AddAdminProperty;
