// packageModel.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  packageName: {
    type: String,
  },
  timestamp: {
    type: Map,
    of: Number,
    required: true,
    default: {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    },
  },
  kind: {
    type: Number,
    default: 0,
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
