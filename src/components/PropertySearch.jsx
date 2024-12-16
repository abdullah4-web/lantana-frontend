import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../Pages/PropertyCard';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import Select from 'react-select';
import './PropertySearch.css';

function PropertySearch() {
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    location: '',
    category: '',
    priceRange: '',
    areaRange: '',
    for: '',
    queryText: '',
  });

  const getImageUrl = (imageUrls) => {
    if (imageUrls && imageUrls.length > 0) {
      return imageUrls[0];
    }
    return '/placeholder.jpg';
  };

  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [properties, setProperties] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = ['Categories', 'plot', 'house', 'shop', 'villa', 'office', 'apartment'];
  const forOptions = ['for', 'sale', 'rent'];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: '100%', // Equal height for all elements
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

  useEffect(() => {
    axios.get(`/api/locations`)
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
      });
  }, []);

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
  ];

  const areaRangeOptions = [
    { label: 'Size', value: '' },
    { label: '0 - 100', value: '0-100' },
    { label: '110 - 200', value: '110-200' },
    { label: '210 - 300', value: '210-300' },
    { label: '310 - 400', value: '310-400' },
    { label: '410 - 500', value: '410-500' },
    { label: '510 - 600', value: '510-600' },
    { label: '610 - 700', value: '610-700' },
    { label: '710 - 800', value: '710-800' },
    { label: '810 - 900', value: '810-900' },
    { label: '910 - 1000', value: '910-1000' },
    // Add more options as needed
];

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

  const clearFilters = () => {
    setSearchCriteria({
      title: '',
      location: '',
      category: '',
      priceRange: '',
      areaRange: '',
      for: '',
      queryText: '',
    });
    setFilteredLocations([]);
    setShowResults(false);
  };

  const handleSearch = () => {
    setLoading(true);
    setShowResults(false);

    const queryText = searchCriteria.title;
    const locationToSend = searchCriteria.location === 'Location' ? '' : searchCriteria.location;
    const categoryToSend = searchCriteria.category === 'Categories' ? '' : searchCriteria.category;
    const forToSend = searchCriteria.for === 'For' ? '' : searchCriteria.for;
    const priceRangeToSend = searchCriteria.priceRange || '';
    const areaRangeToSend = searchCriteria.areaRange || '';

    axios.get(`/api/properties/search`, {
      params: {
        location: locationToSend,
        category: categoryToSend,
        for: forToSend,
        queryText: queryText,
        priceRange: priceRangeToSend,
        areaRange: areaRangeToSend,
      },
    })
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
        setShowResults(true);
      })
      .catch((error) => {
        console.error('Error searching properties:', error);
        setLoading(false);
      });
  };

  const override = css`
    display: block;
    radius : 5;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <>
      <div className="main">
        <div className="container-fluid bg-primary mb-3" style={{ padding: '20px' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    placeholder="Search by Title"
                    value={searchCriteria.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <Select
                    options={locations.map((location) => ({ value: location, label: location }))}
                    isClearable
                    isSearchable
                    placeholder="Location"
                    value={filteredLocations.map((location) => ({ value: location, label: location }))}
                    onMenuOpen={() => setFilteredLocations(locations)}
                    onChange={(selectedOption) => handleInputChange('location', selectedOption ? selectedOption.value : '')}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <select 
                    name="category"
                    className="form-control"
                    value={searchCriteria.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  >
                    {categories.map((category) => (
                      <option value={category} key={category}>
                        {category}
                      </option>
                    ))} 
                  </select>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <select
                    name="for"
                    className="form-control"
                    value={searchCriteria.for}
                    onChange={(e) => handleInputChange('for', e.target.value)}
                  >
                    {forOptions.map((forOption) => (
                      <option value={forOption} key={forOption}>
                        {forOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3">
                  <Select
                    name="priceRange"
                    options={priceRangeOptions}
                    placeholder="Select Price Range"
                    value={priceRangeOptions.find((option) => option.value === searchCriteria.priceRange)}
                    onChange={(selectedOption) => handleInputChange('priceRange', selectedOption ? selectedOption.value : '')}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <Select
                    name="areaRange"
                    options={areaRangeOptions}
                    placeholder="Size Range"
                    value={areaRangeOptions.find((option) => option.value === searchCriteria.areaRange)}
                    onChange={(selectedOption) => handleInputChange('areaRange', selectedOption ? selectedOption.value : '')}
                    styles={customStyles}
                  />
                </div>
              </div>
              <div className="col-md-1">
                <button className="btn btn-dark btn-block" onClick={handleSearch}>
                  Search
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-secondary btn-block" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="main d-flex justify-content-center align-items-center">
          <div className="container">
            {loading ? (
              <div className="text-center">
                <ClipLoader css={override} size={150} color={'#123abc'} loading={loading} />
                <p>Loading...</p>
              </div>
            ) : showResults && properties.length > 0 ? (
              <div>
                <div className="text-center mx-auto mb-3">
                  <h1 className="mb-1">Found {properties.length} Properties </h1>
                  <p>Buy and Sell your Favorite Property For Yourself with Lantana Marketing Limited</p>
                </div>

                <div className="row g-4">
                  {properties.map((property, index) => (
                    <div key={property._id} className="col-md-4 col-sm-6 mb-4">
                      <div className="card">
                        <PropertyCard key={index} property={property} getImageUrl={getImageUrl} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : showResults && properties.length === 0 ? (
              <div className="text-center">
                <h1>No Results Found</h1>
                <p>Try adjusting your search criteria.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertySearch;