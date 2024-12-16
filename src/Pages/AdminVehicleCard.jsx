import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { formatDistanceToNow } from 'date-fns';
import { useUserContext } from '../UserContext';
import axios from 'axios';

const AdminVehicleCard = ({ vehicle, getImageUrl, onDelete, onUpdate, index }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useUserContext();

  const updatedAtDate = vehicle.updatedAt ? new Date(vehicle.updatedAt) : new Date();
  const timeElapsed = formatDistanceToNow(updatedAtDate, { addSuffix: true });

  const [editedVehicle, setEditedVehicle] = useState({
    approved: vehicle.approved || false,
  });

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditVehicle = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      await axios.put(`/api/vehicles/editvehiclebyadmin/${vehicle._id}`, editedVehicle, config);
      setIsEditModalOpen(false);

      onUpdate(index, editedVehicle);
    } catch (error) {
      console.error('Error editing vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      // Perform the delete operation only if the onDelete function is provided
      if (onDelete) {
        // Send a DELETE request to delete the vehicle
        await axios.delete(`/api/vehicles/deletevehiclebyadmin/${vehicle._id}`, config);

        // Call the onDelete function to update the vehicle list
        onDelete(index, vehicle ? vehicle._id : null); 
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle({
      ...editedVehicle,
      [name]: value,
    });
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
            {editedVehicle.approved ? 'Approved' : 'Not Approved'}
          </small>
          <small
            className="flex-fill text-center border-end py-2"
            onClick={handleDeleteVehicle} // Call the handleDeleteVehicle function when the "Delete Vehicle" button is clicked
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
          <div className="mb-3">
            <label htmlFor="edit-approved" className="form-label">
              Approved Status
            </label>
            <select
              className="form-select"
              id="edit-approved"
              name="approved"
              value={editedVehicle.approved ? 'Yes' : 'No'}
              onChange={handleInputChange}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          {loading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <Button variant="primary" onClick={handleEditVehicle}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminVehicleCard;