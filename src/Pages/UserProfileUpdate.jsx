import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import { Container, Row, Col, Form, Button, Alert, Card, Modal,  } from 'react-bootstrap';
import { SET_USER } from '../UserContext';
import './UserProfileUpdate.css';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';

const UserProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useUserContext();
  const [newName, setNewName] = useState('');
  const [newcontactnumber, setNewcontactnumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPicture, setNewPicture] = useState(null); // Using null as initial value
  const [message, setMessage] = useState('');
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [userPicture, setUserPicture] = useState(''); // Updated to store picture URL directly

  // Update the userData state and userPicture state with profile picture URL
  useEffect(() => {
    setUserData(state.user);
    setUserPicture(state.user.picture); // Assuming state.user.picture is the URL
  }, [state.user]);
  const showToast = (message, type) => {
    toast(message, { type });
  };

  const handleUpdateProfile = async () => {
    if (newPassword !== newPasswordConfirm) {
      setPasswordMismatch(true);
      showToast('Passwords do not match.', 'error'); // Show error toast
      return;
    }

    try {
      setLoading(true);
      setShowModal(false);
      const formData = new FormData();
      formData.append('name', newName);
      formData.append('email', newEmail);
      formData.append('password', newPassword);
      formData.append('contactnumber', newcontactnumber);
      if (newPicture) {
        formData.append('picture', newPicture);
      }

      const response = await axios.put(`/api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setMessage('Profile updated successfully');
        dispatch({
          type: SET_USER,
          payload: response.data,
        });
        closeModal();
        showToast('Profile updated successfully', 'success'); // Show success toast
      }
    } catch (error) {
      setMessage('Error updating profile');
      showToast('Error updating profile', 'error'); // Show error toast
    } finally {
      setLoading(false); // Stop loading indicator regardless of success or error
    }
  };
  const openModal = () => {
    setNewName(userData.name); // Set initial values for the modal inputs
    setNewcontactnumber(userData.contactnumber);
    setNewEmail(userData.email);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPasswordMismatch(false); // Reset password mismatch state
  };

  return (
    <Container className="profile-container">
      <h2 className="mb-4 text-center">Your Profile</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={6}>
          <Card className="profile-card">
            <div className="text-center mt-4">
              <img
                src={userPicture}
                alt="Avatar"
                className="rounded-circle"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            <Card.Body>
              <Card.Title>Name: {userData.name}</Card.Title>
              <Card.Text>Email: {userData.email}</Card.Text>
              <Card.Text>Contact Number: {userData.contactnumber}</Card.Text>
              <Button variant="primary" onClick={openModal}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>

          <Modal className="custom-modal" show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>New Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Contact Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter new Contact Number"
                  value={newcontactnumber}
                  onChange={(e) => setNewcontactnumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>New Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                />
              </Form.Group>
              {passwordMismatch && <p className="text-danger">Passwords do not match.</p>}
              <Form.Group>
                <Form.Label>New Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewPicture(e.target.files[0])}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateProfile}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          {loading ? (
            <Spinner />
          ) : (
            message && (
              <Alert
                variant={message.includes('Error') ? 'danger' : 'success'}
                className="mt-3"
              >
                {message}
              </Alert>
            )
          )}
        </Col>
      </Row>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
};

export default UserProfileUpdate;
