/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const LivescoreCard = ({name, score}) => {
    
  return (
    <div>
      <div className='bg-gradient-to-r from-red-400 to-purple-400 p-10 rounded-lg shadow-md'>
        <h1 className='text-2xl my-10 text-slate-700'>{name}</h1>
        <h1 className='text-xl my-10 text-slate-700'>Score: {score}</h1>
      </div>
    </div>
  );
}

export default LivescoreCard;
