import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserStats } from '../api/trackServer'; // Import the API function

function MainScreen() {
  const [stats, setStats] = useState({
    adventures: 0,
    totalDistance: 0,
    totalTime: 0,
  });
  const [activeUserName, setActiveUserName] = useState(''); // State to hold the active user's name

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await getUserStats();
        if (response.status === 200) {
          const data = response.data;
          setStats(data);
        } else {
          console.error('Failed to fetch user stats');
        }
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    // Fetch user stats and active user's name
    fetchUserStats();

    // Retrieve the active user's name from the user object (you might need to adapt this based on your user object structure)
    // Here, we assume that the user object is available after login and contains a 'name' field
    const activeUser = JSON.parse(localStorage.getItem('user')); // Example: Storing the user object in localStorage

    if (activeUser) {
      setActiveUserName(activeUser.name); // Set the active user's name in the state
    }
  }, []);

  return (
    <div className="main-screen">
      <h2>Welcome // {activeUserName}!</h2> {/* Display the greeting */}
      <div className="my-stats">
        <h2>My Stats</h2>
        <div className="stats-container">
          <div className="stat">
            <h3>Adventures</h3>
            <p>{stats.adventures}</p>
          </div>
          <div className="stat">
            <h3>Total Distance</h3>
            <p>{stats.totalDistance} miles</p>
          </div>
          <div className="stat">
            <h3>Total Time</h3>
            <p>{stats.totalTime} minutes</p>
          </div>
        </div>
      </div>
      <div className="navigation">
        <ul>
          <li><a href="/add-activity">+ Add Activity</a></li>
          <li><Link to="/all-activities">All Activities</Link></li>
          <li><Link to="/accomplishments">Accomplishments</Link></li>
          <li><Link to="/activity-map">Activity Map</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;
