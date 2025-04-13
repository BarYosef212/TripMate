import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    isGroupChat: { type: Boolean, default: false },
    lastMessageAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
  });
  
chatSchema.index({ participants: 1 });
chatSchema.index({ tripId: 1 });
  
module.exports = mongoose.model('Chat', chatSchema);
  