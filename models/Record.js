const mongoose = require('mongoose');

const RecordSchema = mongoose.Schema(
  {
    co: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    sensorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor',
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.model('record', RecordSchema);

module.exports = Record;
