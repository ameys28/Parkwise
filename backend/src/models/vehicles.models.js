import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  numberPlate: { type: String, required: true }, // Required field for vehicle number plate
  guest: { type: Boolean, default: false }, // Indicates if the vehicle belongs to a guest
});

export default mongoose.model('Vehicle', vehicleSchema);
