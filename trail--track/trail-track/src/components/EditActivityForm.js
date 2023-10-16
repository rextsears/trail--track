import React, { useState, useEffect } from 'react';
import { editActivity } from '../api/trackServer';

function EditActivityForm({ activityData, onSubmit }) {
  const [formData, setFormData] = useState({ ...activityData });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

    useEffect(() => {
      if (activityData) {
        setFormData(activityData);
      }
    }, [activityData]);    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editActivity(activityData._id, formData);
      console.log('Activity updated successfully', response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error('Failed to update activity', error);
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
