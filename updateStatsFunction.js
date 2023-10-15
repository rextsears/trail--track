const mongoose = require('mongoose');
const UserStats = require('./models/userStats');
const Activity = require('./models/activities');

const parseTimeString = function parseTimeString(timeString) {
  console.log('Parsing time string:', timeString);
  const [minutes, seconds] = timeString.split(':').map(Number);
  console.log('Minutes:', minutes, 'Seconds:', seconds);
  const milliseconds = Number(timeString.split('.')[1]);
  console.log('Milliseconds:', milliseconds);
  return milliseconds + seconds * 1000 + minutes * 60 * 1000;
}

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
          totalTime: {
            $sum: {
              $add: [
                { $multiply: ['$time.hours', 60] }, // Convert hours to minutes
                { $multiply: ['$time.minutes', 1] }, // Convert minutes to minutes
                { $divide: ['$time.seconds', 60] }, // Convert seconds to minutes
                { $divide: ['$time.milliseconds', 60000] }, // Convert milliseconds to minutes
                { $reduce: { // Convert formattedTime to minutes using parseTimeString
                  input: { $split: ['$formattedTime', '.'] },
                  initialValue: 0,
                  in: { $add: ['$$value', { $divide: [parseTimeString('$$this'), 60000] }] },
                } },
              ],
            },
          },
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
