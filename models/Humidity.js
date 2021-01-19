const mongoose = require('mongoose');

const HumiditySchema = mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Humidity = mongoose.model('Humidity', HumiditySchema);

module.exports = Humidity;
