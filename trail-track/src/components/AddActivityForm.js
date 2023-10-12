import React, { useState } from 'react';
import { addActivity } from '../api/trackServer'; // Import the addActivity function

function AddActivityForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    activityType: '',
    location: '',
    completionTime: '',
    distance: '',
    accomplishment: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the addActivity API function here
    try {
      const response = await addActivity(formData);
      // Handle the response, maybe show a success message or update the UI
      console.log('Activity added successfully', response.data);
      onSubmit(response.data); // Optionally, you can pass the added activity data back to the parent component
    } catch (error) {
      console.error('Failed to add activity', error);
      // Handle the error, show an error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs and labels, similar to the example in a previous response */}
      {/* ... */}
    </form>
  );
}

export default AddActivityForm;
