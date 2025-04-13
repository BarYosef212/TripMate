import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['trip_view', 'trip_like', 'match_accept', 'trip_comment', 'profile_visit'],
    required: true 
  },
  refId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    refPath: 'type'
  },
  createdAt: { type: Date, default: Date.now },
});

activitySchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', activitySchema);
