import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Spinner from '../components/Spinner';
import AdminVehicleCard from './AdminVehicleCard';
import "./main.css";

const AdminAllVehicles = () => {
  const { state } = useUserContext();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllVehicles = async () => {
      try {
        const response = await axios.get(`/api/vehicles/admin/getallvehicles`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        // Reverse the vehicles array to show the latest vehicles first
        setVehicles(response.data.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch Vehicles');
        setLoading(false);
      }
    };

    fetchAllVehicles();
  }, [state.user.token]);

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };
  
  const handleUpdateVehicle = (index, updatedVehicle, deletedVehicleId) => {
    if (deletedVehicleId) {
      // If deletedVehicleId is provided, remove the deleted vehicle from the list
      setVehicles((prevUserVehicles) =>
        prevUserVehicles.filter((vehicle) => vehicle._id !== deletedVehicleId)
      );
    } else {
      // Update the uservehicles array with the edited vehicle
      const updatedVehicles = [...vehicles];
      updatedVehicles[index] = updatedVehicle;
      setVehicles(updatedVehicles);
    }
  };

  const handleDeleteVehicle = async (index) => {
    try {
      // Send a DELETE request to delete the vehicle
      await axios.delete(`/api/vehicles/deletevehiclebyadmin/${vehicles[index]._id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      // Update the vehicles list by removing the deleted vehicle
      setVehicles((prevVehicles) => prevVehicles.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  return (
    <div className="main">
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">All Vehicles For Admin</h1>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <Spinner />
          </div>
        ) : error ? (
          <div className="col-12 text-center text-danger">Error: {error}</div>
        ) : (
          vehicles.map((vehicle, index) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <AdminVehicleCard
                vehicle={vehicle}
                getImageUrl={getImageUrl}
                index={index}
                onDelete={(index, deletedVehicleId) =>
                  handleUpdateVehicle(index, null, deletedVehicleId) 
                }
              />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminAllVehicles;
