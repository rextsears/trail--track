import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getActivities, deleteActivity } from '../api/trackServer.js';
import TrackMap from './TrackMap';
import '../styles/map.css';

function ActivityDetail() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // State for showing the confirmation modal
    const navigate = useNavigate(); // Access to the history object for redirection

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

    const handleDeleteConfirmation = () => {
        // Set the state to confirm the deletion
        setShowConfirmation(false);

        // Call the deleteActivity function with the activity ID
        deleteActivity(id)
            .then(() => {
                // Redirect to the All Activities page after deletion
                navigate('/all-activities');
            })
            .catch((error) => {
                console.error('Error deleting activity:', error);
                // Handle the error
            });
    };

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
            <div className="button-container">
                <Link to={`/edit/${id}`} className="edit-button">Edit</Link>
                <button onClick={() => setShowConfirmation(true)} className="delete-button">Delete</button>
            </div>
            <div className="map-container">
                <TrackMap />
            </div>

            {showConfirmation && ( // Display the confirmation modal when showConfirmation is true
                <div className="confirmation-modal">
                    <p>Are you sure you want to delete this activity?</p>
                    <button onClick={handleDeleteConfirmation}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
            )}
        </div>
    );
}

export default ActivityDetail;
