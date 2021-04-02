const Record = require('../models/Record'),
  Sensor = require('../models/Sensor'),
  io = require('socket.io');

const submitRecord = async (req, res) => {
  try {
    const { co, temperature, humidity,headCount } = req.body;
    const { key } = req.params;

    let sensor = await Sensor.findOne({ key });

    if (!sensor) {
      res.status(400).send('This sensor is not registered yet');
    }

    let record = new Record({
      co,
      temperature,
      humidity,
      headCount,
      sensorId: sensor._id,
    });
    await record.save();

    req.sensor = sensor;
    await testAll(req);

    record.sensorId = sensor;

    res.status(200).json(record);
  } catch (error) {
    console.log(error.message);
  }
};

const getLatestData = async (req, res) => {
  try {
    const { _id } = req.sensor;

    let data = await Record.find({ sensorId: _id })
      .sort({ createdAt: -1 })
      .limit(1)
      .populate('sensorId');

    if (res) res.status(200).json(data[0]);
    return data[0];
  } catch (error) {
    console.log(error.message);
  }
};

const testAll = async (req) => {
  try {
    const { humidity, co, temperature,headCount } = await getLatestData(req);

    if (humidity > 50 && temperature > 35 && co >= 100) {
      global.io.sockets.to(req.sensor.key).emit('sensor', {
        humidity,
        co,
        temperature,
        headCount,
        sensorId: req.sensor,
      });
      global.io.sockets.to('admin').emit('admin', {
        humidity,
        co,
        temperature,
        headCount,
        sensorId: req.sensor,
      });
    }
  } catch (error) {}
};

const validateCivilDefense = async (req, res) => {
  try {
    let newSensors = [];
    const { code } = req.body;
    if (code != 123) res.status(422).send({ error: 'Invalid Passcode' });

    const sensors = await Sensor.find();
    // console.log(sensors);
    for (let i = 0; i < sensors.length; i++) {
      let data = await Record.find({ sensorId: sensors[i]._id })
        .sort({ createdAt: -1 })
        .limit(1)
        .populate('sensorId');

      newSensors.push({ ...data[0], ...sensors[i]._doc });
    }

    res.status(200).json(newSensors);
  } catch (error) {}
};

module.exports = { submitRecord, getLatestData, validateCivilDefense };
