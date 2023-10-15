import React, { useState, useEffect } from 'react';
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

    // Use useEffect to update the form data when activityData changes
    useEffect(() => {
      if (activityData) {
        setFormData(activityData); // Set the initial state with activityData
      }
    }, [activityData]);    

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
      <div>
        <label htmlFor="activityType">Activity Type:</label>
        <input
          type="text"
          id="activityType"
          name="activityType"
          value={formData.activityType}
          onChange={handleInputChange}
        />
      </div>
  
      <div>
        <label htmlFor="distance">Distance (in miles):</label>
        <input
          type="number"
          id="distance"
          name="distance"
          value={formData.distance}
          onChange={handleInputChange}
        />
      </div>
  
      <div>
        <label htmlFor="completionTime">Completion Time:</label>
        <input
          type="text"
          id="completionTime"
          name="completionTime"
          value={formData.completionTime}
          onChange={handleInputChange}
        />
      </div>
  
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
  
      <div>
        <label htmlFor="accomplishment">Accomplishment:</label>
        <textarea
          id="accomplishment"
          name="accomplishment"
          value={formData.accomplishment}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  );
  
}

export default EditActivityForm;
