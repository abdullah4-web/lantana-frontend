import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';

const AddProperty = () => {
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
    images: [], // Store uploaded images in an array
  });
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 'calc(2.375rem + 16px)',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#007bff' : 'white',
      color: state.isFocused ? 'white' : '#495057',
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption ? selectedOption.value : '' });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageArray = [];
    for (let i = 0; i < files.length; i++) {
      imageArray.push(files[i]);
    }
    setFormData({ ...formData, images: imageArray });
  };



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
      const response = await fetch(`/api/properties/addproperty`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success('Property Posted successfully and Notification Sent to admin for approval');
        setFormData({
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
      } else {
        toast.error('Failed to add property');
      }
    } catch (error) {
      toast.error('Error adding property');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="border p-3 mx-auto my-4 shadow-sm" style={{ maxWidth: 400 }}>
        <h4 className="bold text-center text-uppercase">Post Your Property Ad </h4>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name of The Property</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder='Name that should appear in Ad'
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description / Define Your Property</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Please describe or define your property here..."
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Posting Property For</Form.Label>
            <Form.Control
              as="select"
              name="for"
              value={formData.for}
              onChange={handleInputChange}
              custom
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
              custom
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
             placeholder='Sqft...'
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
            value={locations.find((location) => location.value === formData.location)}
            onChange={handleLocationChange}
            styles={customStyles}
          />
        </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Complete Address of the Property</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder='Street, Sector , City etc '
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Share Your Property Images Inculde only 10</Form.Label>
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
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Post Property Ad'}
          </Button>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    </Container>
  );
};

export default AddProperty;
