import React from 'react';
import AddActivityForm from './AddActivityForm';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

function AddActivity() {
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle the submission of the form data, e.g., display a success message
  const handleFormSubmit = (addedActivity) => {
    console.log('Activity added successfully:', addedActivity);
    // You can perform additional actions here, such as updating the UI or showing a success message.

    // Redirect to '/main' after adding the activity
    navigate('/main');
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
