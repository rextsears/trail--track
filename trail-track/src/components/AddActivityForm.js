import React, { useState } from 'react';

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

  /*
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs and labels, similar to the example in a previous response */}
      {/* ... */}
    </form>
  );
}

export default AddActivityForm;
