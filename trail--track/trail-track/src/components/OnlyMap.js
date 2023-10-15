import React from 'react';
import TrackMap from './TrackMap'; // Import the TrackMap component
import { Link } from 'react-router-dom';
//import '../styles/map.css'; // Import the map.css file

function OnlyMap() {
    return (
        <div>
            <TrackMap />
            <Link to="/main">Return to Main</Link>
        </div>
    );
}

export default OnlyMap;
