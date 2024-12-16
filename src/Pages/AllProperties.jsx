import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '../UserContext';
import AdminPropertyCard from './AdminPropertyCard';
import Spinner from '../components/Spinner';
import "./main.css";

const AllProperties = () => {
  const { state } = useUserContext();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`/api/properties/admin/getallproperties`, {
          headers: {
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        // Reverse the properties array to show the latest properties first
        setProperties(response.data.reverse());
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch properties');
        setLoading(false);
      }
    };

    fetchProperties();
  }, [state.user.token]);

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  return (
    <div className="main">
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">All Properties For Admin</h1>
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
          properties.map((property, index) => (
            <div key={property._id} className="col-md-4 col-sm-6 mb-4">
              <AdminPropertyCard property={property} getImageUrl={getImageUrl} index={index} />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default AllProperties;
