const mongoose = require('mongoose');
const Activity = require('./models/activities'); // Import the Activity model
const User = require('./models/user'); // Import the User model

// Function to update activities with the userId field
const updateActivitiesWithUserId = async () => {
  try {
    // Find all activities that do not have the userId field
    const activitiesToUpdate = await Activity.find({ userId: { $exists: false } });

    // Iterate through each activity and update it with the userId
    for (const activity of activitiesToUpdate) {
      // Find the corresponding user by username
      const user = await User.findOne({ username: 'tomsears' }); // Replace 'tomsears' with the actual username

      if (user) {
        // Update the activity with the userId
        activity.userId = user._id;
        await activity.save();
        console.log(`Updated activity with ID ${activity._id} for user ${user.username}`);
      } else {
        console.log(`User with username 'tomsears' not found for activity with ID ${activity._id}`);
      }
    }

    console.log('Finished updating activities.');
  } catch (error) {
    console.error('Error updating activities:', error);
  }
};

// Call the function to update activities with userId
updateActivitiesWithUserId();
