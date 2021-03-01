const Record = require('../models/Record'),
  Sensor = require('../models/Sensor'),
  io = require('socket.io');

const submitRecord = async (req, res) => {
  try {
    const { co, temperature, humidity } = req.body;
    const { key } = req.params;

    let sensor = await Sensor.findOne({ key });

    if (!sensor) {
      res.status(400).send('This sensor is not registered yet');
    }

    let record = new Record({
      co,
      temperature,
      humidity,
      sensorId: sensor._id,
    });
    await record.save();

    req.sensor = sensor;
    await testAll(req);

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
    const { humidity, co, temperature } = await getLatestData(req);

    if (humidity > 50 && temperature > 35 && co >= 100) {
      global.io.sockets.emit('alarm', { humidity, co, temperature });
    }
  } catch (error) {}
};

module.exports = { submitRecord, getLatestData };
