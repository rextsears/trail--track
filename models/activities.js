const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  completionTime: {
    type: String,
    required: true,
  },
  formattedTime: { // Add this field for the properly formatted time
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  accomplishment: {
    type: Boolean,
    default: false,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
