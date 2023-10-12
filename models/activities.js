const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
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
  distance: {
    type: String,
    required: true,
  },
  accomplishment: {
    type: Boolean,
    default: false,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
