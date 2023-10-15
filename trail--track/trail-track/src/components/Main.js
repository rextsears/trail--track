import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserStats, fetchUserName } from '../api/trackServer'; // Correct the import path

function MainScreen() {
  const [stats, setStats] = useState({
    adventures: 0,
    totalDistance: 0,
    totalTime: 0,
  });
  const [activeUserName, setActiveUserName] = useState(''); // State to hold the active user's name

  // Define a function to fetch and update user stats
  const updateUserStats = async () => {
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

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user name when the component mounts
      const userName = await fetchUserName();
      if (userName !== null) {
        setActiveUserName(userName);
      }

      // Fetch and update user stats
      updateUserStats();
    };

    fetchData();
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
