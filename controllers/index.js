const CO = require('../models/CO'),
  Humidity = require('../models/Humidity'),
  Temperature = require('../models/Temperature');

exports.submitHumidity = async (req, res) => {
  try {
    const { value } = req.body;

    const newHumidity = new Humidity({ value });
    await newHumidity.save();

    res.status(200).json(newHumidity);
  } catch (error) {
    console.log(error.message);
  }
};

exports.submitTemperature = async (req, res) => {
  try {
    const { value } = req.body;

    const newTemperature = new Temperature({ value });
    await newTemperature.save();

    res.status(200).json(newTemperature);
  } catch (error) {
    console.log(error.message);
  }
};
exports.submitCO = async (req, res) => {
  try {
    const { value } = req.body;

    const newCO = new CO({ value });
    await newCO.save();

    res.status(200).json(newCO);
  } catch (error) {
    console.log(error.message);
  }
};

exports.getLatestData = async (req, res) => {
  try {
    let humidity = await Humidity.find({})
        .select('value createdAt')
        .sort({ createdAt: -1 })
        .limit(1),
      co = await CO.find({})
        .select('value createdAt')
        .sort({ createdAt: -1 })
        .limit(1),
      temps = await Temperature.find({})
        .select('value createdAt')
        .sort({ createdAt: -1 })
        .limit(1);

    let data = {
      humidity: humidity[0],
      co: co[0],
      temperature: temps[0],
    };

    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
};
