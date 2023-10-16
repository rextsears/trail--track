const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userStatsSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  adventures: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 },
  totalTime: { type: Number, default: 0 },
});

const UserStats = mongoose.model('UserStats', userStatsSchema);


module.exports = UserStats;
