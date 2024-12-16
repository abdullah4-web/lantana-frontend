import React, { useState, useEffect } from 'react';
import { useUserContext } from '../UserContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Spinner } from 'react-bootstrap';
import Select from 'react-select';

const AddAdminVehicle = () => {
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
      const response = await fetch(`/api/vehicles/addvehicleasadmin`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setMessage('Vehicle added successfully');
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
        setMessage('Failed to add vehicle');
      }
    } catch (error) {
      setMessage('Error adding vehicle');
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
      <div className="border p-3 mx-auto my-4 shadow-sm" style={{ maxWidth: 400 }}>
        <h2 className="bold text-center text-uppercase">Add New Vehicle </h2>
        <form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Make:</Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={formData.make}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Model:</Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year:</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type:</Form.Label>
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
            <Form.Label>City:</Form.Label>
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
            <Form.Label>Registered:</Form.Label>
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
            <Form.Label>Mileage:</Form.Label>
            <Form.Control
              type="number"
              name="mileage"
              value={formData.mileage}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>For:</Form.Label>
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
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Engine Capacity:</Form.Label>
            <Form.Control
              type="number"
              name="enginecapacity"
              value={formData.enginecapacity}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fuel Type:</Form.Label>
            <Form.Control
              type="text"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images: Only 10 </Form.Label>
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
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Add Vehicle'}
          </Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Container>
  );
};

export default AddAdminVehicle;
