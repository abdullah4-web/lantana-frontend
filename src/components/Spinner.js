import React from 'react';

import { ClipLoader } from 'react-spinners';

const Spinner = () => {


  return (
    <div className="spinner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', width: '100%' }}>
    <ClipLoader color="#123abc" size={150} loading={true} />
  </div>
  );
};

export default Spinner;
