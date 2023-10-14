import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // Update to your server's base URL

// Function to add a new activity
export const addActivity = (activityData, token) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return axios.post(`${BASE_URL}/api/trackServer`, activityData, { headers });
};

// Function to edit an existing activity
export const editActivity = (activityId, activityData, token) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return axios.put(`${BASE_URL}/api/trackServer/${activityId}`, activityData, { headers });
};

// Function to delete an activity
export const deleteActivity = (activityId, token) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return axios.delete(`${BASE_URL}/api/trackServer/${activityId}`, { headers });
};

// Function for user login
export const login = (userData) => {
  return axios.post(`${BASE_URL}/api/login`, userData);
};

// Function for user registration
export const register = (userData) => {
  return axios.post(`${BASE_URL}/api/join/register`, userData); // Correct URL for registration
};

// Function to get user statistics
export const getUserStats = (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  return axios.get(`${BASE_URL}/api/user/stats`, { headers });
};

// Replace 'your-api-endpoint' with the actual endpoint to fetch activities
const API_ENDPOINT = 'http://localhost:5001/api/activities';

// Function to get a list of activities
export async function getActivities(token) {
  // eslint-disable-next-line
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  try {
    const response = await axios.get(API_ENDPOINT); // Updated URL to fetch activities
    return response;
  } catch (error) {
    throw error;
  }
};