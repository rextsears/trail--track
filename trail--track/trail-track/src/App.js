import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/Main';
import AddActivityForm from './components/AddActivityForm';
import EditActivityForm from './components/EditActivityForm';
import JoinScreen from './components/JoinScreen'; // Import the JoinScreen component
import ActivityList from './components/ActivityList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/add-activity" element={<AddActivityForm />} />
        <Route path="/edit-activity/:id" element={<EditActivityForm />} />
        <Route path="/join" element={<JoinScreen />} /> {/* Define the route for JoinScreen */}
        <Route path="/all-activities" element={<ActivityList />} />
      </Routes>
    </Router>
  );
}

export default App;
