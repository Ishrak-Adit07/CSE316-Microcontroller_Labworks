/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Alert = ({ msg }) => {
  return (
    <div className='bg-red-500 text-white p-2 rounded-md text-sm justify-center items-center flex flex-wrap gap-2 mt-2'>
      <i className="fas fa-exclamation-triangle"></i>
      <span>{msg}</span>
    </div>
  );
}

export default Alert;