// Import necessary libraries and components
import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Spinner } from 'react-bootstrap';
import Select from 'react-select';

const AddUserVehicle = () => {
  const { state } = useUserContext();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    type: 'car',
    city: '',
    registered: '',
    mileage: '',
    price: 0,
    for: 'sale',
    description: '',
    enginecapacity: '',
    fuelType: '',
    images: [], // Store uploaded images in an array
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [registeredOptions, setRegisteredOptions] = useState([]);

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

  const handleCityChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption ? selectedOption.value : '' });
  };

  const handleRegisteredChange = (selectedOption) => {
    setFormData({ ...formData, registered: selectedOption ? selectedOption.value : '' });
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
      const response = await fetch(`/api/vehicles/addvehicleasuser`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success('Vehicle Posted successfully and Notification Sent to Admin for Approval');
        // Clear the form fields on success
        setFormData({
          make: '',
          model: '',
          year: '',
          type: 'car',
          city: '',
          registered: '',
          mileage: '',
          price: 0,
          for: 'sale',
          description: '',
          enginecapacity: '',
          fuelType: '',
          images: [],
        });
      } else {
        toast.error('Something Went Wrong Try Again');
      }
    } catch (error) {
      setMessage('Something Went Wrong Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch options for City and Registered from the API
    fetch(`/api/locations`)
      .then((response) => response.json())
      .then((data) => {
        setCityOptions(data.locations.map((location) => ({ value: location, label: location })));
        setRegisteredOptions(data.locations.map((location) => ({ value: location, label: location })));
      })
      .catch((error) => {
        console.error('Error fetching city options:', error);
      }); 
  }, []);

  return (
    <Container className="pt-1">
      <div className="border p-3 mx-auto my-4 shadow-sm" >
        <h4 className="bold text-center text-uppercase">Post Your Vehicle Ad </h4>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Make of Your Vehicle</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              placeholder='Make ...'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Model of Your Vehicle</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              placeholder='Add model...'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Manufacture Year </Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select Type of Vehicle</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="bicycle">Bicycle</option>
              <option value="haice">Haice</option>
              <option value="bus">Bus</option>
              <option value="sportscar">Sports Car</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Select Your City</Form.Label>
            <Select
              options={cityOptions}
              isClearable
              isSearchable
              placeholder="Select City"
              value={cityOptions.find((option) => option.value === formData.city)}
              onChange={handleCityChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Registered From City</Form.Label>
            <Select
              options={registeredOptions}
              isClearable
              isSearchable
              placeholder="Select Registered"
              value={registeredOptions.find((option) => option.value === formData.registered)}
              onChange={handleRegisteredChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mileage....</Form.Label>
            <Form.Control
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              placeholder='1234'
              required
            /> 
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Posting Ad For</Form.Label>
            <Form.Control
              as="select"
              name="for"
              value={formData.for}
              onChange={handleInputChange}
              required
            >
              <option value="sale">Sale</option>
              <option value="rent">Rent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Price of your vehicle In PKR</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder='1234'
              required
            />
          </Form.Group>
        
          <Form.Group className="mb-3">
            <Form.Label>Describe your Vehicle</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder='Define your car Like Low Cost Hight price ...'
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Engine Capacity Of Your Vehicle</Form.Label>
            <Form.Control
              type="number"
              name="enginecapacity"
              value={formData.enginecapacity}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fuel Type Of your vehicle</Form.Label>
            <Form.Control
              type="text"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Share your vehicle Images include Only 10 </Form.Label>
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
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Post Vehicle Ad'}
          </Button>
        </form>
      
      </div>
    </Container>
  );
};

export default AddUserVehicle;
