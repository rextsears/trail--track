import React, { useState, useEffect } from 'react';

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
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <input
          type="text"
          name="activityType"
          value={formData.activityType}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Location:
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Completion Time:
        <input
          type="text"
          name="completionTime"
          value={formData.completionTime}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Distance:
        <input
          type="text"
          name="distance"
          value={formData.distance}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Accomplishment:
        <input
          type="checkbox"
          name="accomplishment"
          checked={formData.accomplishment}
          onChange={handleInputChange}
        />
      </label>

      <button type="submit">Update Activity</button>
    </form>
  );
}

export default EditActivityForm;
