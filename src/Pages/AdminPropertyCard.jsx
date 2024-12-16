import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './PropertyCard.css';
import { formatDistanceToNow } from 'date-fns';

const AdminPropertyCard = ({ property, getImageUrl, index }) => {
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useUserContext();
  const timeElapsed = formatDistanceToNow(new Date(property.updatedAt), { addSuffix: true });

  const [editedProperty, setEditedProperty] = useState({
    approved: property.approved,
  });

  useEffect(() => {
    if (isEditModalOpen) {
      setEditedProperty({
        approved: property.approved,
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
      setLoading(true);

      const editedApproved = editedProperty.approved ? 'Yes' : 'No';

      const editedPropertyData = {
        approved: editedApproved,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      await axios.put(`/api/properties/editpropertybyadmin/${property._id}`, editedPropertyData, config);
      setIsEditModalOpen(false);
      navigate('/allproperties');
    } catch (error) {
      console.error('Error editing property:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      await axios.delete(`/api/properties/admin/deleteproperty/${property._id}`, config);
      setIsDeleteConfirmed(true);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const renderModal = () => (
    <Modal show={isEditModalOpen} onHide={handleEditModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="edit-approved" className="form-label">
            Approved Status
          </label>
          <select
            className="form-select"
            id="edit-approved"
            value={editedProperty.approved ? 'Yes' : 'No'}
            onChange={(e) => setEditedProperty({ ...editedProperty, approved: e.target.value === 'Yes' })}
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
          <Button variant="primary" onClick={handleEditProperty}>
            Save Changes
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );

  if (isDeleteConfirmed) {
    return null;
  }

  return (
    <>
      <div
        key={index}
        className="col-lg-12 col-md-6 wow fadeInUp user-property-item" // Use the same class as in UserPropertyCard for styling
        data-wow-delay={`0.${index + 1}s`}
      >
        <div className="property-item rounded overflow-hidden">
          <div
            className={`position-relative overflow-hidden user-image-container`} // Use the same class as in UserPropertyCard for styling
          >
            <Link to={`/properties/${property._id}`}>
            <div
            className="image-wrapper"
            style={{
              backgroundImage: `url(${getImageUrl(property.imageUrls)})`,
            }}
          ></div>
            </Link>
            <div
              className={`bg-${property.for === 'For Sell' ? 'primary' : 'success'} rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3`}
            >
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
      {renderModal()}
    </>
  );
};

export default AdminPropertyCard;