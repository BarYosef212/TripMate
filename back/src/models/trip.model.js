import mongoose from "mongoose"

const tripSchema = new mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: {
      country: String,
      city: String,
      location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], index: '2dsphere' }
      }
    },
    travelDates: {
      start: { type: Date, required: true },
      end: { type: Date, required: true }
    },
    groupSize: { type: Number, min: 1 },
    description: String,
    itinerary: [{
      day: Number,
      activities: [{
        time: String,
        title: String,
        description: String,
        location: String
      }]
    }],
    participants: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      isConfirmed: Boolean,
      joinedAt: Date
    }],
    tags: [String],
    createdAt: { type: Date, default: Date.now }
  }, { timestamps: true });
  
tripSchema.index({ 'destination.city': 1, 'travelDates.start': 1 });
  
module.exports = mongoose.model('Trip', tripSchema);
  