const mongoose = require('mongoose');

const COSchema = mongoose.Schema(
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

const CO = mongoose.model('CO', COSchema);

module.exports = CO;
