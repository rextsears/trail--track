import React, { useState } from 'react';
import { editActivity } from '../api/trackServer'; // Import the editActivity function

function EditActivityForm({ activityData, onSubmit }) {
  const [formData, setFormData] = useState({ ...activityData });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the editActivity API function here
    try {
      const response = await editActivity(activityData._id, formData);
      // Handle the response, maybe show a success message or update the UI
      console.log('Activity updated successfully', response.data);
      onSubmit(response.data); // Optionally, you can pass the updated activity data back to the parent component
    } catch (error) {
      console.error('Failed to update activity', error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs and labels, similar to the example in your original code */}
      {/* ... */}
    </form>
  );
}

export default EditActivityForm;
