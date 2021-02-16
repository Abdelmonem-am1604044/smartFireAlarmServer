const mongoose = require('mongoose');

const TemperatureSchema = mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const Temperature = mongoose.model('Temperature', TemperatureSchema);

module.exports = Temperature;
