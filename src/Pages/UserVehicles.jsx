import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import Spinner from '../components/Spinner';
import UserVehicleCard from './UserVehicleCard';
import "./main.css";

const UserVehicles = () => {
  const { state } = useUserContext();
  const [uservehicles, setUserVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleUpdateVehicle = (index, updatedVehicle, deletedVehicleId) => {
    if (deletedVehicleId) {
      // If deletedVehicleId is provided, remove the deleted vehicle from the list
      setUserVehicles((prevUserVehicles) =>
        prevUserVehicles.filter((vehicle) => vehicle._id !== deletedVehicleId)
      );
    } else {
      // Update the uservehicles array with the edited vehicle
      const updatedVehicles = [...uservehicles];
      updatedVehicles[index] = updatedVehicle;
      setUserVehicles(updatedVehicles);
    }
  };

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  useEffect(() => {
    const fetchUserVehicles = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/vehicles/uservehicles/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        // Reverse the uservehicles array to show the latest vehicles first
        setUserVehicles(response.data.reverse());
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (state.user.token) {
      fetchUserVehicles();
    }
  }, [state.user.token]);

  return (
    <div className="main">
    <div className="container my-4">
      <h1>Your Uploaded Vehicles</h1>
      {loading ? (
        <Spinner /> // Show the Loading component while waiting for the API response
      ) : (
        <div className="row">
          {uservehicles.map((vehicle, index) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <UserVehicleCard
                vehicle={vehicle}
                getImageUrl={getImageUrl}
                index={index}
                onDelete={(index, deletedVehicleId) =>
                  handleUpdateVehicle(index, null, deletedVehicleId)
                }
                onUpdate={(index, updatedVehicle) => handleUpdateVehicle(index, updatedVehicle)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default UserVehicles;
