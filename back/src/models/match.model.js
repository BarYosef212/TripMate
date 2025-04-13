import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
    user1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    matchedAt: { type: Date, default: Date.now },
    compatibilityScore: { type: Number, min: 0, max: 100 },
    locationProximityScore: { type: Number, min: 0, max: 100 },
  });
  
matchSchema.index({ user1Id: 1, user2Id: 1 }, { unique: true });
  
module.exports = mongoose.model('Match', matchSchema);
  