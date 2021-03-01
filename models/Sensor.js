const mongoose = require('mongoose');

const SensorSchema = mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Sensor = mongoose.model('Sensor', SensorSchema);
module.exports = Sensor;
