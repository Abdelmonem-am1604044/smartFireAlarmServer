const Sensor = require('../models/Sensor'),
  jwt = require('jsonwebtoken'),
  router = require('express').Router();

router.post('/register/:key', async (req, res) => {
  const { key } = req.params;
  try {
    let sensor = await Sensor.findOne({ key }),
      token;

    if (!sensor) {
      let radius = 0.098937,
        middleLatitude = 25.248236,
        middleLongitude = 51.434599,
        angle = Math.random() * Math.PI * 2,
        latitude = middleLatitude + Math.cos(angle) * radius,
        longitude = middleLongitude + Math.sin(angle) * radius;

      sensor = new Sensor({ key, latitude, longitude });
      await sensor.save();
    }
	
    token = jwt.sign({ sensorId: sensor._id }, 'MY_SECRET_KEY');
    res.send({ token });
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
