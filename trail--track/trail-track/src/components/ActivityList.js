import React, { useEffect, useState } from 'react';
import { getActivities } from '../api/trackServer.js';

function ActivityList() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getActivities()
      .then((response) => {
        console.log('Response data:', response);
        setActivities(response);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error('Error fetching activities:', error);
        setLoading(false);
        setError('Error fetching activities');
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          {Array.isArray(activities) && activities.length > 0 ? (
            activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.activityType}</td>
                <td>{activity.location}</td>
                <td>{activity.completionTime}</td>
                <td>{activity.distance}</td>
                <td>{activity.accomplishment ? 'Yes' : 'No'}</td>
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
