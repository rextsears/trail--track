import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivities } from '../api/trackServer.js';
import TrackMap from './TrackMap'; // Import the TrackMap component
import '../styles/map.css'; // Import the map.css file

function ActivityDetail() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getActivities()
            .then((response) => {
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
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
          <h2>Activity Detail</h2>
          <ul className="detail-container">
          <li>Activity Type: {activity.activityType}</li>
          <li>Location: {activity.location}</li>
          <li>Completion Time: {activity.completionTime}</li>
          <li>Distance: {activity.distance}</li>
          </ul>
        <div className="map-container">
            <TrackMap />
        </div>
        </div>
      );    
    
}

export default ActivityDetail;
