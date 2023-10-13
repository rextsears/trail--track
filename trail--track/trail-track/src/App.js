import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/Main';
import AddActivityForm from './components/AddActivityForm';
import EditActivityForm from './components/EditActivityForm';
import JoinScreen from './components/JoinScreen';
import ActivityList from './components/ActivityList';
import Accomplishments from './components/Accomplishments'; // Import the Accomplishments component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/add-activity" element={<AddActivityForm />} />
        <Route path="/edit-activity/:id" element={<EditActivityForm />} />
        <Route path="/join" element={<JoinScreen />} />
        <Route path="/all-activities" element={<ActivityList />} />
        <Route path="/accomplishments" element={<Accomplishments />} />
      </Routes>
    </Router>
  );
}

export default App;