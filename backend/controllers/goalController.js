const asyncHandler = require("express-async-handler");
const goalModel = require("../models/goalModel");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc    Get goals
// @route   Get /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(newGoal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const toUpdateGoal = await Goal.findById(req.params.id);
  if (!toUpdateGoal) {
    res.status(400);
    throw new Error("Goal nor found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (toUpdateGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to update resource");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(`Updated goal ${req.params.id} ${updatedGoal}`);
  res.status(200).json(updatedGoal);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const toDeleteGoal = await Goal.findById(req.params.id);

  if (!toDeleteGoal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (toDeleteGoal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized to delete resource");
  }

  await toDeleteGoal.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
