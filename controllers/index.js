const CO = require('../models/CO'),
  Humidity = require('../models/Humidity'),
  Temperature = require('../models/Temperature'),
  io = require('socket.io');

const submitHumidity = async (req, res) => {
  try {
    const { value } = req.body;
    const { _id } = req.user;

    const newHumidity = new Humidity({ value, userID: _id });
    await newHumidity.save();
    await testAll(req);

    res.status(200).json(newHumidity);
  } catch (error) {
    console.log(error.message);
  }
};

const submitTemperature = async (req, res) => {
  try {
    const { value } = req.body;
    const { _id } = req.user;

    const newTemperature = new Temperature({ value, userID: _id });
    await newTemperature.save();
    await testAll(req);
    res.status(200).json(newTemperature);
  } catch (error) {
    console.log(error.message);
  }
};

const submitCO = async (req, res) => {
  try {
    const { value } = req.body;
    const { _id } = req.user;

    const newCO = new CO({ value, userID: _id });
    await newCO.save();
    await testAll(req);

    res.status(200).json(newCO);
  } catch (error) {
    console.log(error.message);
  }
};

const getLatestData = async (req, res) => {
  try {
    const { _id } = req.user;

    let humidity = await Humidity.find({ userID: _id })
      .select('value createdAt')
      .sort({ createdAt: -1 })
      .limit(1);

    let co = await CO.find({ userID: _id })
      .select('value createdAt')
      .sort({ createdAt: -1 })
      .limit(1);

    let temps = await Temperature.find({ userID: _id })
      .select('value createdAt')
      .sort({ createdAt: -1 })
      .limit(1);

    let data = {
      humidity: humidity[0],
      co: co[0],
      temperature: temps[0],
    };
    if (res) res.status(200).json(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const testAll = async (req) => {
  try {
    const { humidity, co, temperature } = await getLatestData(req);

    if (humidity.value > 50 && temperature.value > 35 && co.value >= 100) {
      // console.log('alarm');
      global.io.sockets.emit('alarm', { humidity, co, temperature });
    }
  } catch (error) {}
};

module.exports = { submitCO, submitHumidity, submitTemperature, getLatestData };
