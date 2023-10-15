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
    const response = await axios.get(`${BASE_URL}/api/user/details`);  // The specific endpoint might vary based on your server configuration
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
      Authorization: `Bearer ${authToken}`, // Include the token in the headers
    },
  });
};

// Function to get a list of activities
export async function getActivities(authToken) {
  try {
    const API_ENDPOINT = 'http://localhost:5001/api/activities'; // Adjust the endpoint as needed

    const response = await axios.get(API_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the token in the headers
      },
    });

    return response.data; // Return the data directly, not the entire response
  } catch (error) {
    throw error;
  }
};

// Function to fetch user's name
export const fetchUserName = async () => {
  // Fetch the user's name using the new route
  try {
    const response = await fetch('/api/user/name');

    // Check the status code of the response
    if (response.status !== 200) {
      console.error('Failed to fetch user name:', response.statusText);
      return null;
    }

    // Parse the JSON response
    const data = await response.json();

    // Validate the JSON response
    if (!data.name) {
      console.error('Invalid server response');
      return null;
    }

    // Return the user's name
    return data.name;
  } catch (error) {
    console.error('Failed to fetch user name:', error);
    return null;
  }
};
