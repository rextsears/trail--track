const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for user statistics
const userStatsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  adventures: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
});

// Create the UserStats model
const UserStats = mongoose.model('UserStats', userStatsSchema);


module.exports = UserStats;
