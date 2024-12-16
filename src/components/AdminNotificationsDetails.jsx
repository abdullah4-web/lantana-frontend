import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminPropertyCard from '../Pages/AdminPropertyCard';
import { useUserContext } from '../UserContext';
import Spinner from '../components/Spinner';

const AdminNotificationsDetails = () => {
  const { state } = useUserContext();
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [propertyNotFound, setPropertyNotFound] = useState(false); // New state variable

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      if (response.ok) {
        const propertyData = await response.json();
        setProperty(propertyData);
      } else if (response.status === 404) { // Property not found
        setPropertyNotFound(true);
      } else {
        console.error('Error fetching property details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id, state.user.token]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">Pending For Approval</h1>
        </div>
      </div>
      <div className="row">
        {propertyNotFound ? (
          <div className="col-12 text-center">
            <p>Property Not Found</p>
          </div>
        ) : property ? (
          <div className="col-md-4 col-sm-6 mb-4">
            <AdminPropertyCard property={property} getImageUrl={getImageUrl} index={id} />
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

export default AdminNotificationsDetails;
