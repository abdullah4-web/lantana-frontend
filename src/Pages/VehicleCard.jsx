import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const VehicleCard = ({ vehicle, getImageUrl }) => {
  const timeElapsed = formatDistanceToNow(new Date(vehicle.updatedAt), { addSuffix: true });

  return (
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
        
        </h5>
      </div>
      <div className="ms-3 pb-0">
        <h5 className="vehicle-make text-primary mb-3">
          {vehicle.price} PKR
        
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
        <div className="flex-fill text-center border-end py-2">
          <div className="text-primary">
            <i className="fa fa-gas-pump text-success me-2" /> {vehicle.fuelType}
          </div>
        </div>
        <div className="flex-fill text-center py-2">
          <div className="text-primary">
            <i className="fa fa-address-book text-success me-2" /> {vehicle.city}
          </div>
        </div>
      </div>
     
      <div className="ms-3 border-top">
        <p className="vehicle-last-updated text-muted ">
          <i className="fa fa-clock text-primary me-2" /> {timeElapsed}
        </p>
      </div>
    </div>
  );
};

export default VehicleCard;
