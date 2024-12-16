import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import VehicleCard from '../Pages/VehicleCard';

const priceRangeOptions = [
  { label: 'Prices', value: '' },
  { label: '0 - 100,000 PKR', value: '0-100000' },
  { label: '100,000 - 500,000 PKR', value: '100000-500000' },
  { label: '500,000 - 1,000,000 PKR', value: '500000-1000000' },
  { label: '1,000,000 - 1,500,000 PKR', value: '1000000-1500000' },
  { label: '1,500,000 - 2,000,000 PKR', value: '1500000-2000000' },
  { label: '2,000,000 - 2,500,000 PKR', value: '2000000-2500000' },
  { label: '2,500,000 - 3,000,000 PKR', value: '2500000-3000000' },
  { label: '3,000,000 - 3,500,000 PKR', value: '3000000-3500000' },
  { label: '3,500,000 - 4,000,000 PKR', value: '3500000-4000000' },
  { label: '4,000,000 - 4,500,000 PKR', value: '4000000-4500000' },
  { label: '4,500,000 - 5,000,000 PKR', value: '4500000-5000000' },
  { label: '5,000,000 - 6,000,000 PKR', value: '5000000-6000000' },
  { label: '6,000,000 - 7,000,000 PKR', value: '6000000-7000000' },
  { label: '7,000,000 - 8,000,000 PKR', value: '7000000-8000000' },
  { label: '8,000,000 - 9,000,000 PKR', value: '8000000-9000000' },
  { label: '9,000,000 - 10,000,000 PKR', value: '9000000-10000000' },
  // Add more options as needed
];

function VehicleSearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    location: '',
    make: '',
    model: '',
    priceRange: '',
    type: '',
    vehicleFor: '',
    searchText: '',
  });

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 'calc(2.375rem + 16px)',
      border: '1px solid #ced4da',
      borderRadius: '0.375rem',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#6c757d',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#007bff' : 'white',
      color: state.isFocused ? 'white' : '#495057',
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    }),
  };
  const clearFilters = () => {
    setSearchCriteria({
      title: '',
      location: '',
      make: '',
      model: '',
      priceRange: '',
      type: '',
      vehicleFor: '',
      searchText: '',
    });
    setFilteredLocations([]);
    setSearchResults([]);
    setIsSearchClicked(false);
  };

  useEffect(() => {
    // Fetch locations from the API
    axios
      .get(`/api/locations`)
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

  const handleInputChange = (name, value) => {
    setSearchCriteria({
      ...searchCriteria,
      [name]: value,
    });

    if (name === 'location') {
      const filtered = value
        ? locations.filter((location) => location.toLowerCase().includes(value.toLowerCase()))
        : locations;
      setFilteredLocations(filtered);
    }
  };

  const handleSearch = () => {
    setIsSearchClicked(true);
    setIsLoading(true);

    const {
      location,
      make,
      model,
      priceRange,
      type,
      vehicleFor,
      title,
    } = searchCriteria;
  

    axios
      .get(`/api/vehicles/search`, {
        params: {
          location: location === 'Locations' ? '' : location,
          make,
          model,
          priceRange: priceRange === 'Prices' ? '' : priceRange,
          type: type === 'Types' ? '' : type,
          vehicleFor: vehicleFor === 'For' ? '' : vehicleFor,
          queryText: title,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError('An error occurred while searching for vehicles. Please try again later.');
        setIsLoading(false);
      });
  };

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div className="main">
      <div className="container-fluid bg-primary mb-5 wow fadeIn" style={{ padding: '35px' }}>
        <div className="container">
          <div className="row g-2">
            <div className="col-md-10">
              <div className="row g-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control border-0 py-3"
                    placeholder="Search by Title"
                    value={searchCriteria.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    name="make"
                    id="make"
                    className="form-control border-0 py-3"
                    placeholder="Make"
                    value={searchCriteria.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    name="model"
                    id="model"
                    className="form-control border-0 py-3"
                    placeholder="Model"
                    value={searchCriteria.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <Select
                    options={priceRangeOptions}
                    isClearable
                    isSearchable
                    placeholder="Select Price Range"
                    value={priceRangeOptions.find((option) => option.value === searchCriteria.priceRange)}
                    onChange={(selectedOption) => handleInputChange('priceRange', selectedOption ? selectedOption.value : '')}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="row g-2 mt-2">
                <div className="col-md-2">
                  <select
                    name="vehicleFor"
                    id="vehicleFor"
                    className="form-select border-0 py-3"
                    value={searchCriteria.vehicleFor}
                    onChange={(e) => handleInputChange('vehicleFor', e.target.value)}
                  >
                    <option value="For">For</option>
                    <option value="Sale">Sale</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <Select
                    options={locations.map((location) => ({ value: location, label: location }))}
                    isClearable
                    isSearchable
                    placeholder="Select Location"
                    value={filteredLocations.map((location) => ({ value: location, label: location }))}
                    onMenuOpen={() => setFilteredLocations(locations)}
                    onChange={(selectedOption) => handleInputChange('location', selectedOption ? selectedOption.value : '')}
                    styles={customStyles}
                  />
                </div>
                <div className="col-md-2">
                  <select
                    name="type"
                    id="type"
                    className="form-select border-0 py-3"
                    value={searchCriteria.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="">Types</option>
                    <option value="car">car</option>
                    <option value="bus">bus</option>
                    <option value="van">van</option>
                    <option value="haice">haice</option>
                    <option value="motorcycle">motorcycle</option>
                    <option value="bicycle">bicycle</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <button
                type="submit"
                className="btn btn-dark border-0 w-100 py-3"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="col-md-2">
        <button
          className="btn btn-secondary border-0 w-100 py-3"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
          </div>
        </div>
      </div>

      {isLoading && isSearchClicked && (
        <div className="text-center mt-4">
          <ClipLoader css={override} size={150} color={'#123abc'} loading={isLoading} />
          <p>Loading...</p>
        </div>
      )}

      {error && isSearchClicked && (
        <div className="text-center mt-4">
          <p>Error: {error}</p>
        </div>
      )}

      {searchResults.length > 0 && isSearchClicked ? (
        <div className="text-center mb-4">
          <h1>Found {searchResults.length} Vehicles</h1>
        </div>
      ) : null}

      {searchResults.length === 0 && isSearchClicked ? (
        <div className="text-center mt-4">
          <h1>No Results Found</h1>
          <p>Try adjusting your search criteria.</p>
        </div>
      ) : null}

      {searchResults.length > 0 && isSearchClicked && (
        <div className="row mt-4">
          {searchResults.map((vehicle) => (
            <div key={vehicle._id} className="col-md-4 col-sm-6 mb-4">
              <VehicleCard vehicle={vehicle} getImageUrl={getImageUrl} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VehicleSearch;
