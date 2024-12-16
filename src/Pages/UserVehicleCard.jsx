import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { formatDistanceToNow } from 'date-fns';
import { useUserContext } from '../UserContext';
import "./UservehicleCard.css";
import Select from 'react-select';

const UserVehicleCard = ({ vehicle, getImageUrl, onDelete, onUpdate, index }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { state } = useUserContext();
  const [cityOptions, setCityOptions] = useState([]);
  const [registeredOptions, setRegisteredOptions] = useState([]);

  const updatedAtDate = vehicle.updatedAt ? new Date(vehicle.updatedAt) : new Date();
  const timeElapsed = formatDistanceToNow(updatedAtDate, { addSuffix: true });
  useEffect(() => {
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

  const [editedVehicle, setEditedVehicle] = useState({
    make: vehicle.make || '',
    model: vehicle.model || '',
    year: vehicle.year || '',
    type: vehicle.type || '',
    city: vehicle.city || '',
    registered: vehicle.registered || '',
    mileage: vehicle.mileage || '',
    price: vehicle.price || '',
    for: vehicle.for || '',
    description: vehicle.description || '',
    enginecapacity: vehicle.enginecapacity || '',
    fuelType: vehicle.fuelType || '',
  });

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditVehicle = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      await axios.put(`/api/vehicles/updatevehicle/${vehicle._id}`, editedVehicle, config);
      setIsEditModalOpen(false);

      onUpdate(index, editedVehicle);
    } catch (error) {
      console.error('Error editing vehicle:', error);
    }
  };

  const handleDeleteVehicle = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };
  
      await axios.delete(`/api/vehicles/deletevehicle/${vehicle._id}`, config);
      onDelete(index, vehicle ? vehicle._id : null); // Check if vehicle exists before accessing its _id
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle({
      ...editedVehicle,
      [name]: value,
    });
  };
  const handleCityChange = (selectedOption) => {
    setEditedVehicle({ ...editedVehicle, city: selectedOption ? selectedOption.value : '' });
  };

  const handleRegisteredChange = (selectedOption) => {
    setEditedVehicle({ ...editedVehicle, registered: selectedOption ? selectedOption.value : '' });
  };

    return (
      <>
        <div className="vehicle-card rounded shadow overflow-hidden">
          <div className="position-relative overflow-hidden image-container">
            <Link to={`/vehicles/${vehicle._id}`}>
              <div
                className="image-wrapper"
                style={{
                  backgroundImage: `url(${getImageUrl(vehicle.imageUrls)})`,
                }}
              ></div>
            </Link>
            <div
              className={`vehicle-status bg-${vehicle.for === 'sale' ? 'primary' : 'success'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}
            >
              {vehicle.for === 'sale' ? 'For Sale' : 'For Rent'}
            </div>
            <div className="vehicle-title bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
              {vehicle.model}
            </div>
          </div>
          <div className="p-4 pb-0">
            <h5 className="vehicle-make text-primary mb-3">
              {vehicle.make}
              <span className="ms-5 text-success">{vehicle.price} PKR</span>
            </h5>
          </div>
          <div className="d-flex border-top">
            <div className="flex-fill text-center border-end py-2">
              <div className="text-primary">
                <i className="fa fa-car text-success me-2" /> {vehicle.year}
              </div>
            </div>
            <div className="flex-fill text-center border-end py-2">
              <div className="text-primary">
                <i className="fa fa-road text-success me-2" /> {vehicle.mileage} miles
              </div>
            </div>
            <div className="flex-fill text-center py-2">
              <div className="text-primary">
                <i className="fa fa-tachometer text-success me-2" /> {vehicle.enginecapacity} cc
              </div>
            </div>
          </div>
          <div className="d-flex border-top">
          <div className="flex-fill text-center border-end py-2">
          <div className="text-primary">
            <i className="fa fa-car text-success me-2" /> {vehicle.type}
          </div>
        </div>
            <div className="flex-fill text-center border-end py-1">
              <div className="text-primary">
                <i className="fa fa-gas-pump text-success py-1" /> {vehicle.fuelType}
              </div>
            </div>
            <div className="flex-fill text-center">
              <div className="text-primary">
                <p className="vehicle-last-updated text-muted mt-1 ">
                  <i className="fa fa-clock text-primary " /> {timeElapsed}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex border-top">
            <small
              className="flex-fill text-center border-end py-2"
              onClick={handleEditModalOpen}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa fa-pencil-square-o text-primary me-2" />
              Edit Vehicle
            </small>
            <small className="flex-fill text-center border-end py-2">
              <i className="fa fa-thumbs-up text-primary me-2" />
              {vehicle.approved ? 'Approved' : 'Not Approved'}
            </small>
            <small
              className="flex-fill text-center border-end py-2"
              onClick={handleDeleteVehicle}
              style={{ cursor: 'pointer' }}
            >
              <i className="fa fa-trash text-primary me-2" />
              Delete Vehicle
            </small>
          </div>
        </div>

      <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Vehicle</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <div className="modal-scrollable-content">
    <div className="mb-3">
      <label htmlFor="edit-make" className="form-label">
        Make
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-make"
        name="make"
        value={editedVehicle.make}
        onChange={handleInputChange}
      />
    </div>
    
    <div className="mb-3">
      <label htmlFor="edit-model" className="form-label">
        Model
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-model"
        name="model"
        value={editedVehicle.model}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-year" className="form-label">
        Year
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-year"
        name="year"
        value={editedVehicle.year}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-for" className="form-label">
        Type (car/van/bus/haice/truck)
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-type"
        name="type"
        value={editedVehicle.type}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
                <label htmlFor="edit-city" className="form-label">
                  City
                </label>
                <Select
                  options={cityOptions}
                  isClearable
                  isSearchable
                  placeholder="Select City"
                  value={cityOptions.find((option) => option.value === editedVehicle.city)}
                  onChange={handleCityChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="edit-registered" className="form-label">
                  Registered
                </label>
                <Select
                  options={registeredOptions}
                  isClearable
                  isSearchable
                  placeholder="Select Registered"
                  value={registeredOptions.find((option) => option.value === editedVehicle.registered)}
                  onChange={handleRegisteredChange}
                />
              </div>
    <div className="mb-3">
      <label htmlFor="edit-mileage" className="form-label">
        Mileage
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-mileage"
        name="mileage"
        value={editedVehicle.mileage}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-price" className="form-label">
        Price
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-price"
        name="price"
        value={editedVehicle.price}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-for" className="form-label">
        For (Sale/Rent)
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-for"
        name="for"
        value={editedVehicle.for}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-description" className="form-label">
        Description
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-description"
        name="description"
        value={editedVehicle.description}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-enginecapacity" className="form-label">
        Engine Capacity
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-enginecapacity"
        name="enginecapacity"
        value={editedVehicle.enginecapacity}
        onChange={handleInputChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="edit-fueltype" className="form-label">
        Fuel Type
      </label>
      <input
        type="text"
        className="form-control"
        id="edit-fueltype"
        name="fuelType"
        value={editedVehicle.fuelType}
        onChange={handleInputChange}
      />
    </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleEditModalClose}>
      Close
    </Button>
    <Button variant="primary" onClick={handleEditVehicle}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default UserVehicleCard;
