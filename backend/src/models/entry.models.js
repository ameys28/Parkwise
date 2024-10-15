import mongoose from 'mongoose';

const entryLogSchema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, // Reference to the Vehicle model
  entryTime: { type: Date, required: true }, // Required field for entry time
  exitTime: Date, // Optional exit time
});

export default mongoose.model('EntryLog', entryLogSchema);
