import React from 'react';
import TrackMap from './TrackMap';
import { Link } from 'react-router-dom';

function OnlyMap() {
    return (
        <div>
            <TrackMap />
            <Link to="/main">Return to Main</Link>
        </div>
    );
}

export default OnlyMap;
