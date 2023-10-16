import React from 'react';
import TrackMap from './TrackMap';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/activitydetail.css';

function OnlyMap() {
    return (
        <div>
        <div className="map-space">
        </div>
        <div className="map-container">
        <section id="maptext">Activity Map</section>
            <TrackMap />
        </div>
        <div className="map-space">
        </div>
        <Link to="/main" id="navlink">Return to Main</Link>
    </div>
    );
}

export default OnlyMap;
