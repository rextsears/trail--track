const mongoose = require('mongoose');
const UserStats = require('./models/userStats');
const Activity = require('./models/activities');

const updateStats = async (userId) => {
  try {
    console.log('Updating user statistics for user:', userId);

    const updatedStats = await Activity.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $group: {
          _id: null,
          adventures: { $sum: 1 },
          totalDistance: { $sum: { $toDouble: '$distance' } },
          totalTime: { $sum: { $toDouble: '$completionTime' } },
        },
      },
      {
        $project: {
          adventures: 1,
          totalDistance: { $round: ['$totalDistance', 2] },
          totalTime: 1,
        },
      },
    ]);

    console.log('Updated statistics:', updatedStats);

    const [updatedStat] = updatedStats;

    let userStats = await UserStats.findOne({ userId });

    if (!userStats) {
      userStats = new UserStats({ userId });
    }

    if (updatedStat) {
      userStats.adventures = updatedStat.adventures;
      userStats.totalDistance = updatedStat.totalDistance;
      userStats.totalTime = updatedStat.totalTime;
      await userStats.save();
      console.log('User statistics updated successfully');
    } else {
      console.log('No activities found for this user');
    }
  } catch (error) {
    console.error('Error updating user statistics:', error);
  }
};

module.exports = updateStats;
