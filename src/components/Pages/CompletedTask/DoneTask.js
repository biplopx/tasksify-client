import React from 'react';

const DoneTask = ({ task }) => {
  const { title } = task;
  return (
    <li className='p-4 flex justify-between items-center bg-white border border-secondary duration-300 text-black hover:bg-gray-100 mb-3 rounded-md'>
      {title}
    </li>
  );
};

export default DoneTask;