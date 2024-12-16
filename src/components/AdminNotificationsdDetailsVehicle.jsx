import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminVehicleCard from '../Pages/AdminVehicleCard';
import { useUserContext } from '../UserContext';
import Spinner from '../components/Spinner';

const AdminNotificationsDetailsVehicle = () => {
  const { state } = useUserContext();
  const { id } = useParams();

  const [vehicle, setVehicle] = useState(null);
  const [vehicleNotFound, setVehicleNotFound] = useState(false); // New state variable

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  const fetchVehicle = async () => {
    try {
      const response = await fetch(`/api/vehicles/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      if (response.ok) {
        const vehicleData = await response.json();
        setVehicle(vehicleData);
      } else if (response.status === 404) { // Vehicle not found
        setVehicleNotFound(true);
      } else {
        console.error('Error fetching Vehicle details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching Vehicle details:', error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [id, state.user.token]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Pending For Approval</h1>
        </div>
      </div>
      <div className="row">
        {vehicleNotFound ? (
          <div className="col-12 text-center">
            <p>Vehicle Not Found</p>
          </div>
        ) : vehicle ? (
          <div className="col-md-4 col-sm-6 mb-4">
            <AdminVehicleCard vehicle={vehicle} getImageUrl={getImageUrl} index={id} />
          </div>
        ) : (
          <div className="col-12 text-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotificationsDetailsVehicle;
