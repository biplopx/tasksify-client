import React from 'react';

const SingleTask = ({ task }) => {
  const { title, description } = task;
  return (
    <div>
      <div className="collapse border-primary border rounded-md mb-2">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-white text-primary-content peer-checked:bg-white peer-checked:text-secondary-content">
          {title}
        </div>
        <div className="collapse-content bg-white text-primary-content peer-checked:bg-white peer-checked:text-secondary-content">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTask;