import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // Update to your server's base URL

// Function to add a new activity
export const addActivity = (activityData) => {
  return axios.post(`${BASE_URL}/api/trackServer`, activityData);
};

// Function to edit an existing activity
export const editActivity = (activityId, activityData) => {
  return axios.put(`${BASE_URL}/api/trackServer/${activityId}`, activityData);
};

// Function to delete an activity
export const deleteActivity = (activityId) => {
  return axios.delete(`${BASE_URL}/api/trackServer/${activityId}`);
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
export const getUserStats = () => {
  return axios.get(`${BASE_URL}/api/user/stats`);
};

// Replace 'your-api-endpoint' with the actual endpoint to fetch activities
const API_ENDPOINT = 'http://localhost:5001/api/activities';

// Function to get a list of activities
export async function getActivities() {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw error;
  }
};

// Function to fetch user accomplishments
export async function getAccomplishments() {
  try {
    const response = await axios.get('http://localhost:5001/api/accomplishments');
    return response;
  } catch (error) {
    throw error;
  }
};

