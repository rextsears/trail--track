import axios from 'axios';

const BASE_URL = 'http://localhost:5001'; // Update to your server's base URL

export const addActivity = (activityData) => {
  return axios.post(`${BASE_URL}/trackServer`, activityData); // Update routes accordingly
};

export const editActivity = (activityId, activityData) => {
  return axios.put(`${BASE_URL}/trackServer/${activityId}`, activityData); // Update routes accordingly
};

export const deleteActivity = (activityId) => {
  return axios.delete(`${BASE_URL}/trackServer/${activityId}`); // Update routes accordingly
};

export const login = (userData) => {
  return axios.post(`${BASE_URL}/api/login`, userData);
};

export const register = (userData) => {
  return axios.post(`${BASE_URL}/api/join/register`, userData); // Correct URL for registration
};

export const getUserStats = () => {
  return axios.get(`${BASE_URL}/user/stats`);
};

// Replace 'your-api-endpoint' with the actual endpoint to fetch activities
const API_ENDPOINT = 'http://localhost:5001/all-activities';

export async function getActivities() {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response;
  } catch (error) {
    throw error;
  }
}