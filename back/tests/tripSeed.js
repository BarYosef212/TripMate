import mongoose from "mongoose";
import dotenv from "dotenv";
import Trip from "../src/models/trip.model.js";
import User from "../src/models/user.model.js";

dotenv.config({ path: "./.env" });

await mongoose.connect(process.env.MONGO_URI);
console.log("Connected to MongoDB");

const cities = [
  { country: "Japan", city: "Kyoto", coordinates: [135.7681, 35.0116] },
  { country: "Morocco", city: "Marrakech", coordinates: [-7.9811, 31.6295] },
  { country: "Greece", city: "Santorini", coordinates: [25.4615, 36.3932] },
  { country: "Mexico", city: "Mexico City", coordinates: [-99.1332, 19.4326] },
  { country: "Iceland", city: "Reykjavik", coordinates: [-21.8277, 64.1283] },
  { country: "USA", city: "New Orleans", coordinates: [-90.0715, 29.9511] },
  { country: "South Africa", city: "Cape Town", coordinates: [18.4241, -33.9249] },
  { country: "Vietnam", city: "Hanoi", coordinates: [105.8544, 21.0285] },
  { country: "Australia", city: "Melbourne", coordinates: [144.9631, -37.8136] },
  { country: "Portugal", city: "Lisbon", coordinates: [-9.1393, 38.7223] }
];

const tagsPool = [
  "adventure", "relaxing", "foodie", "nature", "party", "culture", "roadtrip", "photography", "spiritual", "local-living"
];

const themes = [
  {
    title: "Cultural Discovery",
    activities: [
      { time: "10:00", title: "Museum Tour", description: "Explore local art and history." },
      { time: "15:00", title: "Old Town Walk", description: "Wander through ancient streets." }
    ]
  },
  {
    title: "Food Exploration",
    activities: [
      { time: "11:00", title: "Market Visit", description: "Sample traditional dishes." },
      { time: "18:00", title: "Cooking Class", description: "Learn how to make local food." }
    ]
  },
  {
    title: "Nature Retreat",
    activities: [
      { time: "07:00", title: "Hiking Adventure", description: "Scenic trails and landscapes." },
      { time: "17:00", title: "Campfire Evening", description: "Relax with a warm fire and stories." }
    ]
  },
  {
    title: "Nightlife & Music",
    activities: [
      { time: "21:00", title: "Live Music", description: "Experience the local music scene." },
      { time: "00:00", title: "Night Club", description: "Dance the night away." }
    ]
  },
  {
    title: "Spiritual Journey",
    activities: [
      { time: "06:00", title: "Sunrise Meditation", description: "Start the day centered and calm." },
      { time: "13:00", title: "Temple Visit", description: "Connect with local beliefs and rituals." }
    ]
  }
];

const randomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start, end) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const generateItinerary = (theme) => {
  const days = Math.floor(Math.random() * 4) + 2;
  return Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    activities: theme.activities.map((activity) => ({
      ...activity,
      location: `Location ${i + 1}-${activity.title}`
    }))
  }));
};

const generateDescription = (themeTitle, city, country) =>
  `Join us on a unique ${themeTitle.toLowerCase()} trip through ${city}, ${country}, where we’ll explore, connect, and experience unforgettable moments.`;

const seedTrips = async () => {
  const users = await User.find();
  if (users.length === 0) {
    console.error("No users found. Please seed users first.");
    return;
  }

  const trips = [];

  for (let i = 0; i < 30; i++) {
    const host = randomFromArray(users);
    const participants = users
      .filter((u) => u._id.toString() !== host._id.toString())
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 6))
      .map((user) => ({
        userId: user._id,
        isConfirmed: Math.random() > 0.3,
        joinedAt: randomDate(new Date(2024, 0, 1), new Date(2025, 0, 1))
      }));

    const destination = randomFromArray(cities);
    const theme = randomFromArray(themes);
    const startDate = randomDate(new Date(2025, 1, 1), new Date(2025, 6, 30));
    const endDate = new Date(startDate.getTime() + Math.floor(Math.random() * 5 + 3) * 86400000);

    trips.push({
      host: host._id,
      destination: {
        country: destination.country,
        city: destination.city,
        location: {
          type: "Point",
          coordinates: destination.coordinates
        }
      },
      travelDates: {
        start: startDate,
        end: endDate
      },
      groupSize: participants.length + 1,
      description: generateDescription(theme.title, destination.city, destination.country),
      itinerary: generateItinerary(theme),
      participants,
      tags: [randomFromArray(tagsPool), randomFromArray(tagsPool)],
      createdAt: new Date()
    });
  }

  await Trip.insertMany(trips);
  console.log("30 trips inserted");
};

seedTrips()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
  })
  .finally(() => {
    mongoose.disconnect();
  });
