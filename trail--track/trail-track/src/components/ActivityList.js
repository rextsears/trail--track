import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActivityList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities when the component mounts
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage
    //console.log('Token:', token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    axios
      .get('http://localhost:5001/api/activities', { headers }) // Include the headers
      .then((response) => {
        console.log(response.data); // Log the response data
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h1>All Activities</h1>
      <table>
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Location</th>
            <th>Completion Time</th>
            <th>Distance</th>
            <th>Accomplishment</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(activities) ? (
            activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.activityType}</td>
                <td>{activity.location}</td>
                <td>{activity.completionTime}</td>
                <td>{activity.distance}</td>
                <td>{activity.accomplishment}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No activities to display.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityList;
