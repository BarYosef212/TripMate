import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, maxlength: 2000 },
    createdAt: { type: Date, default: Date.now }
  });
  
reviewSchema.index({ reviewerId: 1, revieweeId: 1 }, { unique: true });
  
module.exports = mongoose.model('Review', reviewSchema);
  