import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivities } from '../api/trackServer.js'; // Import the getActivities function

function ActivityDetail() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null); // Use null as the initial state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch the specific activity by ID
      getActivities()
        .then((response) => {
          // Find the activity with the matching ID
          const matchedActivity = response.find((activity) => activity._id === id);

          if (matchedActivity) {
            setActivity(matchedActivity);
            setLoading(false);
            setError(null);
          } else {
            setError('Activity not found');
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error fetching activities:', error);
          setError('Error fetching activities');
          setLoading(false);
        });
    }, [id]); // Re-run the effect when the 'id' parameter changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the activity details
  return (
    <div>
      <h2>Activity Detail</h2>
      <p>Activity Type: {activity.activityType}</p>
      <p>Location: {activity.location}</p>
      <p>Completion Time: {activity.completionTime}</p>
      <p>Distance: {activity.distance}</p>
      <p>Accomplishment: {activity.accomplishment ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default ActivityDetail;
