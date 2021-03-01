const jwt = require('jsonwebtoken'),
  Sensor = require('../models/Sensor');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in first' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (error, payload) => {
    if (error) {
      return res.status(401).send({ error: 'You must be logged in first' });
    }

    const { sensorId } = payload,
      sensor = await Sensor.findOne({ _id: sensorId });
    req.sensor = sensor;
    next();
  });
};
