import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female'] },
    languagesSpoken: [{ type: String, lowercase: true, trim: true }],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], index: '2dsphere' }
    },
    travelPreferences: {
      destinations: [String],
      travelDates: {
        start: Date,
        end: Date
      },
      groupSize: Number,
      ageRange: {
        min: Number,
        max: Number
      },
      interests: [String],
      travelStyle: {
        type: String,
        enum: ['budget', 'luxury', 'adventure', 'cultural', 'nature', 'social']
      }
    },
    bio: { type: String, maxlength: 100 },
    photos: [String],
    socialLinks: {
      instagram: String,
      facebook: String,
    },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  }, { timestamps: true });
  
  module.exports = mongoose.model('User', userSchema);