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

// Function to update user statistics when a new adventure is added
userStatsSchema.methods.updateStatsOnAdventureAddition = async function () {
  try {
    const userId = this.userId;

    // Calculate the updated statistics based on the adventures collection
    const updatedStats = await mongoose.model('Adventure').aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: null,
          adventures: { $sum: 1 },
          totalDistance: { $sum: '$distance' },
          totalTime: { $sum: '$time' },
        },
      },
    ]);

    // Update the user's statistics
    const [updatedStat] = updatedStats;
    this.adventures = updatedStat ? updatedStat.adventures : 0;
    this.totalDistance = updatedStat ? updatedStat.totalDistance : 0;
    this.totalTime = updatedStat ? updatedStat.totalTime : 0;

    // Save the updated statistics
    await this.save();
  } catch (error) {
    console.error('Error updating user statistics:', error);
  }
};

module.exports = UserStats;
