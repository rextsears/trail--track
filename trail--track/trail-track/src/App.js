import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/Main';
import AddActivityForm from './components/AddActivityForm';
import EditActivityForm from './components/EditActivityForm'; // Import the EditActivityForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/main" element={<MainScreen />} />
        <Route path="/add-activity" element={<AddActivityForm />} />
        <Route path="/edit-activity/:id" element={<EditActivityForm />} /> {/* Define the route for EditActivityForm with a parameter (activity ID) */}
      </Routes>
    </Router>
  );
}

export default App;
