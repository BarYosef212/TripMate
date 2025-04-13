import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, maxlength: 3000 },
    photos: [String],
    tags: [String],
    isPublic: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  });
  
module.exports = mongoose.model('Experience', experienceSchema);
  