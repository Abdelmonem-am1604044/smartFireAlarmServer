const mongoose = require('mongoose');

const HumiditySchema = mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
  },
  {
    timestamps: true,
  }
);

const Humidity = mongoose.model('Humidity', HumiditySchema);

module.exports = Humidity;
