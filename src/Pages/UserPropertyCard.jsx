import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "./UserPropertyCard.css"; // Import the same CSS file for styling
import { formatDistanceToNow } from 'date-fns';

const UserPropertyCard = ({ property, getImageUrl, index }) => {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { state } = useUserContext();
  const timeElapsed = formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true });

  // State to store edited property data
  const [editedProperty, setEditedProperty] = useState({});

  useEffect(() => {
    // Set the edited property data when the modal is opened
    if (isEditModalOpen) {
      setEditedProperty({
        title: property.title,
        description: property.description,
        for: property.for,
        category: property.category,
        price: property.price,
        area: property.area,
        location: property.location,
        address: property.address,
      });
    }
  }, [isEditModalOpen, property]);

  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleEditProperty = async () => {
    try {
      // Send a PUT request to update the property with editedProperty data
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };
  
      // Update the property fields
      const updatedProperty = {
        title: editedProperty.title,
        description: editedProperty.description,
        for: editedProperty.for,
        category: editedProperty.category,
        price: editedProperty.price,
        area: editedProperty.area,
        location: editedProperty.location,
        address: editedProperty.address,
        
      };
  
      await axios.put(
        `/api/properties/editproperty/${property._id}`,
        updatedProperty,
        config
      );
      setIsEditModalOpen(false);
      // You may want to update the property data after a successful edit
    } catch (error) {
      console.error('Error editing property:', error);
    }
  };
  

  const handleDeleteClick = async () => {
    try {
      // Send a DELETE request to delete the property
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      await axios.delete(`/api/properties/deleteproperty/${property._id}`, config);
      setIsDeleteConfirmed(true);
      // You may want to handle additional logic, such as updating the property list
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  if (isDeleteConfirmed) {
    return null;
  }
  return (
    <>
    <div
      key={index}
      className="col-lg-12 col-md-6 wow fadeInUp user-property-item" 
      data-wow-delay={`0.${index + 1}s`}
    >
      <div className="property-item rounded overflow-hidden">
        <div className="position-relative overflow-hidden user-image-container">
          <Link to={`/properties/${property._id}`}>
          <div
            className="image-wrapper"
            style={{
              backgroundImage: `url(${getImageUrl(property.imageUrls)})`,
            }}
          ></div>
          </Link>
          <div className={`bg-${property.for === 'For Sell' ? 'primary' : 'success'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}>
            {property.for}
          </div>
          <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
            {property.category}
          </div>
        </div>
        <div className="p-4 pb-0">
          <h5 className="text-primary mb-3">{property.price} PKR</h5>
          <a className="d-block h5 mb-2" href="#">
            {property.title}
          </a>
          <p>
            <i className="fa fa-map-marker-alt text-primary me-2" />
            {property.address}
          </p>
          <p>
          <i className="fa fa-calendar text-primary me-2" />
          Last Updated {timeElapsed} {/* Display the time elapsed */}
        </p>
        </div>
        <div className="d-flex border-top">
          <small
            className="flex-fill text-center border-end py-2"
            onClick={handleEditModalOpen}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-pencil-square-o text-primary me-2" />
            Edit Property
          </small>
          <small className="flex-fill text-center border-end py-2">
            <i className="fa fa-thumbs-up text-primary me-2" />
            {property.approved ? 'Approved' : 'Not Approved'} 
          </small>
          <small
            className="flex-fill text-center py-2"
            onClick={handleDeleteClick}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa fa-trash text-primary me-2" />
            Delete Property
          </small>
        </div>
      </div>
    </div>
    <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form inputs for editing property */}
        <div className="mb-3">
          <label htmlFor="edit-title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-title"
            value={editedProperty.title || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, title: e.target.value })}
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="edit-description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="edit-description"
            value={editedProperty.description || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, description: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-for" className="form-label">
            For
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-for"
            value={editedProperty.for || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, for: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-category" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-category"
            value={editedProperty.category || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, category: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="edit-price"
            value={editedProperty.price || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, price: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-area" className="form-label">
            Area
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-area"
            value={editedProperty.area || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, area: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-location"
            value={editedProperty.location || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, location: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="edit-address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="edit-address"
            value={editedProperty.address || ''}
            onChange={(e) => setEditedProperty({ ...editedProperty, address: e.target.value })}
          />
        </div>
        {/* Add similar input fields for other property details */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEditModalClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditProperty}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  );
};

export default UserPropertyCard;
