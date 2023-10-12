import React, { useState, useEffect } from 'react';
import { getUserStats } from '../api/trackServer'; // Import the API function

function MainScreen() {
  const [stats, setStats] = useState({
    adventures: 0,
    totalDistance: 0,
    totalTime: 0,
  });

  useEffect(() => {
    // Replace the simulated data retrieval with actual API requests
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

    fetchUserStats();
  }, []);

  return (
    <div className="main-screen">
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
          <li><a href="/all-activities">All Activities</a></li>
          <li><a href="/accomplishments">Accomplishments</a></li>
          <li><a href="/activity-map">Activity Map</a></li>
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;
