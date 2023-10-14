// eslint-disable-next-line
import React, { useState } from 'react';
import AddActivityForm from './AddActivityForm'; // Import the AddActivityForm component
import { Link } from 'react-router-dom';

function AddActivity() {
  // Handle the submission of the form data, e.g., display a success message
  const handleFormSubmit = (addedActivity) => {
    console.log('Activity added successfully:', addedActivity);
    // You can perform additional actions here, such as updating the UI or showing a success message.
  };

  return (
    <div>
      <h2>Add an Activity</h2>
      {/* Render the AddActivityForm component and pass the handleFormSubmit function as a prop to handle the form submission */}
      <AddActivityForm onSubmit={handleFormSubmit} />
      <p>
        <Link to="/main">Back to Main</Link>
      </p>
    </div>
  );
}

export default AddActivity;
