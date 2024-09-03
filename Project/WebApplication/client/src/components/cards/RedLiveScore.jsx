/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const RedLiveScore = ({name, score}) => {
    
  return (
      <div className='bg-gradient-to-r from-red-400 to-purple-400 px-6 py-2 mt-10 lg:my-0 lg:p-10 rounded-lg shadow-md mx-20'>
        <h1 className='text-2xl my-10 text-slate-700'>{name}</h1>
        <h1 className='text-xl my-10 text-slate-700'>Score: {score}</h1>
      </div>
  );
}

export default RedLiveScore;
