import axios from 'axios';

const BASE_URL = 'http://localhost:5001';

// Set up axios to handle cookies
axios.defaults.withCredentials = true;

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
  return axios.post(`${BASE_URL}/api/join/register`, userData);
};

// Function to get user details
export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/details`);
      return response;
  } catch (error) {
      console.error("Failed to fetch user details:", error);
      return error.response;
  }
};

// Function to get user statistics
export const getUserStats = (authToken) => {
  const API_STAT_ENDPOINT = 'http://localhost:5001/api/user/stats';

  return axios.get(API_STAT_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};

// Function to get a list of activities
export async function getActivities(authToken) {
  try {
    const API_ENDPOINT = 'http://localhost:5001/api/activities';

    const response = await axios.get(API_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch user's name
export const fetchUserName = async () => {
  try {
    const response = await fetch('/api/user/name');

    if (response.status !== 200) {
      console.error('Failed to fetch user name:', response.statusText);
      return null;
    }

    const data = await response.json();

    if (!data.name) {
      console.error('Invalid server response');
      return null;
    }

    return data.name;
  } catch (error) {
    console.error('Failed to fetch user name:', error);
    return null;
  }
};
