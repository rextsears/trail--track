import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getActivities, deleteActivity, editActivity } from '../api/trackServer.js';
import TrackMap from './TrackMap';
import EditActivityForm from './EditActivityForm';
import '../styles/common.css';
import '../styles/activitydetail.css';

function ActivityDetail() {
    const { id } = useParams();
    const [activity, setActivity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

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

        setShowConfirmation(false);

        deleteActivity(id)
            .then(() => {
                navigate('/all-activities');
            })
            .catch((error) => {
                console.error('Error deleting activity:', error);
            });
    };

    const handleEditClick = () => {
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
    };

    const handleEditSubmit = async (editedData) => {
        try {
            const response = await editActivity(activity._id, editedData);

            console.log('Activity updated successfully', response.data);

            setActivity(response.data);

            setEditing(false);
        } catch (error) {
            console.error('Failed to update activity', error);
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
                <li>Activity Type: <section>{activity.activityType}</section></li>
                <li>Location: <section>{activity.location}</section></li>
                <li>Completion Time: <section>{activity.completionTime}</section></li>
                <li>Distance: <section>{activity.distance}</section></li>
            </ul>
            <div className="button-container">
                {!editing && (
                    <button onClick={handleEditClick} className="edit-button">
                        Edit
                    </button>
                )}
                {!editing && (
                    <button onClick={() => setShowConfirmation(true)} className="delete-button">
                        Delete
                    </button>
                )}
                {editing && (
                    <button onClick={handleCancel} className="cancel-button">
                        Cancel
                    </button>
                )}
                <Link to="/main" id="navlink">Return to Main</Link>
                <Link to="/all-activities" id="navlink">Return to Activity List</Link>
            </div>
            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Are you sure you want to delete this activity?</p>
                    <button onClick={handleDeleteConfirmation}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
            )}

            {editing && (
                <EditActivityForm activityData={activity} onSubmit={handleEditSubmit} />
            )}
                <div className="map-space">
                </div>
                <div className="map-container">
                <section id="maptext">Map</section>
                    <TrackMap />
                </div>
                <div className="map-space">
                </div>
        </div>
    );
}

export default ActivityDetail;
