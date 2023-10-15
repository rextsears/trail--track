import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getActivities } from '../api/trackServer.js';
import '../styles/common.css';
import '../styles/activitylist.css';

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
      <h1 className="alh1">Trail // Track</h1>
      <h2 className="alh2">All Activities</h2>
      <table>
        <thead>
          <tr>
            <th>Activity Type</th>
            <th>Location</th>
            <th>Completion Time</th>
            <th>Distance</th>
            <th>Accomplishment</th>
            <th>  </th>
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
                <td>
                  <Link to={`/activity/${activity._id}`}>Detail</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No activities to display.</td>
            </tr>
          )}
        </tbody>
      </table>
      <Link to="/main">Return to Main</Link>
    </div>
  );
}

export default ActivityList;
