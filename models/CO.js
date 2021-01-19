const mongoose = require('mongoose');

const COSchema = mongoose.Schema(
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

const CO = mongoose.model('CO', COSchema);

module.exports = CO;
