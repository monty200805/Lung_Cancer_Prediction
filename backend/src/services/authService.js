const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const SALT_ROUNDS = 10;

function generateToken(userId) {
  return jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken(user._id);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);
  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
}

async function getCurrentUser(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return { id: user._id, name: user.name, email: user.email };
}

module.exports = { register, login, getCurrentUser };
