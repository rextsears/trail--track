import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/Main';
import AddActivity from './components/AddActivity';
import EditActivityForm from './components/EditActivityForm';
import JoinScreen from './components/JoinScreen';
import ActivityList from './components/ActivityList';
import Accomplishments from './components/Accomplishments';
import ActivityDetail from './components/ActivityDetail';
import OnlyMap from './components/OnlyMap';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/edit-activity/:id" element={<EditActivityForm />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/all-activities" element={<ActivityList />} />
        <Route path="/accomplishments" element={<Accomplishments />} />
        <Route path="/activity/:id" element={<ActivityDetail />} />
        <Route path="/only-map" element={<OnlyMap />} />
      </Routes>
    </Router>
  );
}

export default App;
