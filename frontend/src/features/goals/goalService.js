import axios from "axios";

const API_URL = "/api/goals";

// Create New Goal
const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, goalData, config);

  return response.data;
};

// Update Goal
const updateGoal = async (id, goalUpdatedData) => {
  const response = await axios.put(API_URL + `/${id}`, goalUpdatedData);

  if (response.data) {
  }

  return response.data;
};

// Get All Goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete Goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + `/${goalId}`, config);

  return response.data;
};

const authService = { createGoal, updateGoal, getGoals, deleteGoal };

export default authService;
