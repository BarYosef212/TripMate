import mongoose from "mongoose";
import User from "../src/models/user.model.js"; // adjust path if needed
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: './.env' });


// connect to your MongoDB
await mongoose.connect(process.env.MONGO_URI);

const genders = ["male", "female"];
const travelStyles = ["budget", "luxury", "adventure", "cultural", "nature", "social"];
const interests = ["food", "culture", "nature", "sports", "music", "history"];
const destinations = ["Japan", "Italy", "France", "Thailand", "Brazil", "Canada"];
const languages = ["english", "spanish", "french", "german", "hebrew", "japanese"];

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const createRandomUser = async (index) => {
  const hashedPassword = await bcrypt.hash("password123", 10);

  return {
    fullName: `User ${index}`,
    email: `user${index}@example.com`,
    passwordHash: hashedPassword,
    birthDate: randomDate(new Date(1980, 0, 1), new Date(2005, 0, 1)),
    gender: randomFromArray(genders),
    languagesSpoken: [randomFromArray(languages), randomFromArray(languages)],
    location: {
      type: "Point",
      coordinates: [
        (Math.random() * 360 - 180).toFixed(6), // longitude
        (Math.random() * 180 - 90).toFixed(6)   // latitude
      ]
    },
    travelPreferences: {
      destinations: [randomFromArray(destinations), randomFromArray(destinations)],
      travelDates: {
        start: randomDate(new Date(2025, 0, 1), new Date(2025, 5, 1)),
        end: randomDate(new Date(2025, 6, 1), new Date(2025, 11, 31))
      },
      groupSize: Math.floor(Math.random() * 5) + 1,
      ageRange: {
        min: Math.floor(Math.random() * 10) + 18,
        max: Math.floor(Math.random() * 20) + 30
      },
      interests: [randomFromArray(interests), randomFromArray(interests)],
      travelStyle: randomFromArray(travelStyles)
    },
    bio: "Random traveler looking for adventures!",
    photos: [`https://randomuser.me/api/portraits/men/${index}.jpg`],
    socialLinks: {
      instagram: `https://instagram.com/user${index}`,
      facebook: `https://facebook.com/user${index}`
    },
    isVerified: Math.random() > 0.5
  };
};

const createUsers = async () => {
  const users = await Promise.all(
    Array.from({ length: 20 }, (_, i) => createRandomUser(i + 1))
  );
  await User.insertMany(users);
  console.log("20 random users created!");
  mongoose.disconnect();
};

createUsers();
