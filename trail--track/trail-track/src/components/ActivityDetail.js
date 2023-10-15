import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivities, deleteActivity, editActivity } from '../api/trackServer.js';
import TrackMap from './TrackMap';
import EditActivityForm from './EditActivityForm'; // Import the EditActivityForm component
import '../styles/map.css';

function ActivityDetail() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // State for showing the confirmation modal
    const [editing, setEditing] = useState(false); // State for enabling edit mode
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

    const handleEditClick = () => {
        // Set the state to enable edit mode
        setEditing(true);
    };

    const handleEditSubmit = async (editedData) => {
        try {
            // Make an API request to update the activity data
            const response = await editActivity(activity._id, editedData);
    
            // Handle the response, maybe show a success message or update the UI
            console.log('Activity updated successfully', response.data);
    
            // Update the local state with the updated data
            setActivity(response.data);
    
            // Set editing to false to exit edit mode
            setEditing(false);
        } catch (error) {
            console.error('Failed to update activity', error);
            // Handle the error, show an error message, etc.
        }
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
                <button onClick={handleEditClick} className="edit-button">Edit</button>
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

            {editing && (
                <EditActivityForm activityData={activity} onSubmit={handleEditSubmit} />
            )}
        </div>
    );
}

export default ActivityDetail;
