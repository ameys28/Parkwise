import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Required username field
  password: { type: String, required: true }, // Required password field
  role: { type: String, enum: ['resident', 'security'], required: true } // Roles can be extended as needed
});

export default mongoose.model('User', userSchema);
