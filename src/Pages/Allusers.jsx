import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./main.css";

const Allusers = () => {
  const [users, setUsers] = useState([]);
  const { state } = useUserContext();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(`/api/users/allusers`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`
          }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchUsers();
  }, [state.user.token]);
  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`
        }
      });

      if (response.status === 200) {
        // User deleted successfully, update the users list
        setUsers(users.filter(user => user._id !== userId));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleAdmin = async (user) => {
    try {
      const response = await axios.put(`/api/users/toggle-admin/${user._id}`, {
        action: user.isAdmin ? 'no' : 'yes' // Toggle the action between 'yes' and 'no'
      }, {
        headers: {
          Authorization: `Bearer ${state.user.token}`
        }
      });

      if (response.status === 200) {
        // Update the user list with the updated user information
        const updatedUsers = users.map((u) =>
          u._id === user._id ? response.data : u
        );

        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error('Error toggling user admin status:', error);
    }
  };

  return (
    <div className="main">
    <div style={{ margin: '40px' }}>
      <h2 className="text-center">All Users</h2>

      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.picture}
                  alt="User"
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.contactnumber}</td>
              <td>
                <input  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  type="checkbox"
                  checked={user.isAdmin}
                  onChange={() => handleToggleAdmin(user)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default Allusers;
