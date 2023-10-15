const mongoose = require('mongoose');
const Activity = require('./models/activities'); // Import the Activity model

// Define the formatTime function to format completionTime
function formatTime(completionTime) {
  // Implement your logic to format the completionTime here
  // Example: Assuming completionTime is in the format "53:04.23"
  // You can split it and format it as needed
  const [minutes, seconds] = completionTime.split(':').map(Number);
  const milliseconds = Number(completionTime.split('.')[1]);
  
  // Format it as needed (e.g., HH:MM:SS.MS)
  return `${minutes}:${seconds}.${milliseconds}`;
}

// Function to update activities with the formattedTime field
const updateActivitiesWithFormattedTime = async () => {
  try {
    // Find all activities that do not have the formattedTime field
    const activitiesToUpdate = await Activity.find({ formattedTime: { $exists: false } });

    // Iterate through each activity and update it with the formattedTime
    for (const activity of activitiesToUpdate) {
      // Format the time and update the activity
      activity.formattedTime = formatTime(activity.completionTime); // Replace formatTime with your formatting logic
      await activity.save();
      console.log(`Updated activity with ID ${activity._id} with formattedTime`);
    }

    console.log('Finished updating activities with formattedTime.');
  } catch (error) {
    console.error('Error updating activities with formattedTime:', error);
  }
};

// Call the function to update activities with formattedTime
updateActivitiesWithFormattedTime();
