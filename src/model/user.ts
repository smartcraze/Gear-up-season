
import mongoose, { Schema, model, models } from 'mongoose';

// Define User schema
const UserSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false, // Password is optional initially for users who haven't set it yet
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// If the model already exists, use the existing one, otherwise create a new one
export const User = models.User || model('User', UserSchema);
