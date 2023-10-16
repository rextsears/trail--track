import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Accomplishments() {
  const [accomplishments, setAccomplishments] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/activities')
      .then((response) => {
        console.log(response);
        const filteredAccomplishments = response.data.filter(
          (accomplishment) => accomplishment.accomplishment === true
        );
        setAccomplishments(filteredAccomplishments);
      })
      .catch((error) => {
        console.error('Error fetching accomplishments:', error);
      });
  }, []);

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
                <td>{accomplishment.completionTime} minutes</td>
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
      <Link to="/main">Return to Main</Link>
    </div>
  );
}

export default Accomplishments;
