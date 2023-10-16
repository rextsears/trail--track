import React from 'react';
import AddActivityForm from './AddActivityForm';
import { Link, useNavigate } from 'react-router-dom';

function AddActivity() {
  const navigate = useNavigate();

  const handleFormSubmit = (addedActivity) => {
    console.log('Activity added successfully:', addedActivity);

    navigate('/main');
  };

  return (
    <div>
      <h2>Add an Activity</h2>
      <AddActivityForm onSubmit={handleFormSubmit} />
      <p>
        <Link to="/main">Back to Main</Link>
      </p>
    </div>
  );
}

export default AddActivity;
