const mongoose = require('mongoose');

const updateStats = async (userId) => {
  try {
    // Your existing code to update user statistics
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
    if (updatedStat) {
      const userStats = await UserStats.findOne({ userId });
      if (userStats) {
        userStats.adventures = updatedStat.adventures;
        userStats.totalDistance = updatedStat.totalDistance;
        userStats.totalTime = updatedStat.totalTime;
        await userStats.save();
      }
    }
  } catch (error) {
    console.error('Error updating user statistics:', error);
  }
};

module.exports = updateStats;
