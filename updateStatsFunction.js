function parseTimeString(timeString) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  const milliseconds = Number(timeString.split('.')[1]);
  return milliseconds + seconds * 1000 + minutes * 60 * 1000;
}

const mongoose = require('mongoose');
const UserStats = require('./models/userStats'); // Import the UserStats model
const Activity = require('./models/activities'); // Import the Activity model

const updateStats = async (userId) => {
  try {
    console.log('Updating user statistics for user:', userId);

    // Your modified code to update user statistics
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
                { $multiply: ['$time.hours', 3600000] },
                { $multiply: ['$time.minutes', 60000] },
                { $multiply: ['$time.seconds', 1000] },
                { $toDouble: '$time.milliseconds' },
                {
                  $reduce: {
                    input: {
                      $map: {
                        input: { $split: ['$formattedTime', '.'] },
                        as: 'timePart',
                        in: { $cond: [{ $eq: ['$$timePart', ''] }, 0, { $toDouble: '$$timePart' }] },
                      },
                    },
                    initialValue: 0,
                    in: {
                      $add: [
                        '$$value',
                        { $multiply: [{ $arrayElemAt: ['$$this', 0] }, 60000] },
                        { $multiply: [{ $arrayElemAt: ['$$this', 1] }, 1000] },
                        { $arrayElemAt: ['$$this', 2] },
                      ],
                    },
                  },
                },             
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

    // Update the user's statistics
    const [updatedStat] = updatedStats;

    // Find the user's statistics
    let userStats = await UserStats.findOne({ userId });

    // If no user statistics exist, create them
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
      console.log('No activities found for this user'); // Adjust the message if needed
    }
  } catch (error) {
    console.error('Error updating user statistics:', error);
  }
};

module.exports = updateStats;
