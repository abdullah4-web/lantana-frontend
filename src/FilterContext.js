import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Create the FilterContext
const FilterContext = createContext();

// Initial state
const initialState = {
  properties: [],
  vehicles: [],
  loading: false,
  error: null,
};

// Reducer function
const filterReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        [action.payload.dataType]: action.payload.data,
      };
    case 'FETCH_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create a custom hook to use the FilterContext
export const useFilterContext = () => {
  return useContext(FilterContext);
};

// Create the FilterProvider component
export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_DATA' });
      try {
        const propertiesResponse = await axios.get(`/api/properties/getallproperties`);
        const vehiclesResponse = await axios.get(`/api/vehicles/getallapprovedvehicles`);

        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          payload: { dataType: 'properties', data: propertiesResponse.data },
        });

        dispatch({
          type: 'FETCH_DATA_SUCCESS',
          payload: { dataType: 'vehicles', data: vehiclesResponse.data },
        });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_ERROR', payload: 'Failed to fetch data' });
      }
    };

    fetchData();
  }, []);

  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  );
};
