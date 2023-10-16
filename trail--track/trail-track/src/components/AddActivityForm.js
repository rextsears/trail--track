import React, { useState } from 'react';
import { addActivity } from '../api/trackServer';

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

    try {
      const response = await addActivity(formData);
      console.log('Activity added successfully', response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error('Failed to add activity', error);
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
        <label htmlFor="distance">Distance:</label>
        <input
          type="text"
          id="distance"
          name="distance"
          value={formData.distance}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="accomplishment">Accomplishment:</label>
        <input
          type="checkbox"
          id="accomplishment"
          name="accomplishment"
          checked={formData.accomplishment}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add Activity</button>
    </form>
  );
}

export default AddActivityForm;
