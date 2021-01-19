const mongoose = require('mongoose');

const TemperatureSchema = mongoose.Schema(
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

const Temperature = mongoose.model('Temperature', TemperatureSchema);

module.exports = Temperature;
