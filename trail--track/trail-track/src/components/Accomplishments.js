import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Accomplishments() {
  const [accomplishments, setAccomplishments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/activities')
      .then((response) => {
        console.log(response); // Log the response data
        // Filter the data to get only accomplishments with "true"
        const filteredAccomplishments = response.data.filter(
          (accomplishment) => accomplishment.accomplishment === true
        );
        setAccomplishments(filteredAccomplishments);
      })
      .catch((error) => {
        console.error('Error fetching accomplishments:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>Accomplishments</h1>
      <table>
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Location</th>
            <th>Completion Time</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(accomplishments) && accomplishments.length > 0 ? (
            accomplishments.map((accomplishment) => (
              <tr key={accomplishment._id}>
                <td>{accomplishment.activityType}</td>
                <td>{accomplishment.location}</td>
                <td>{accomplishment.completionTime}</td>
                <td>{accomplishment.distance}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No accomplishments to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Accomplishments;
