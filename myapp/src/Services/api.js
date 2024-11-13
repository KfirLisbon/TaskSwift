// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Change this if you're using a different port

// Function to get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Add other API calls as needed
