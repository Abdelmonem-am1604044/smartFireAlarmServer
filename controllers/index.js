const CO = require('../models/CO'),
  Humidity = require('../models/Humidity'),
  Temperature = require('../models/Temperature');

const submitHumidity = async (req, res) => {
  try {
    const { value } = req.body;

    const newHumidity = new Humidity({ value });
    await newHumidity.save();
    await testAll();

    res.status(200).json(newHumidity);
  } catch (error) {
    console.log(error.message);
  }
};

const submitTemperature = async (req, res) => {
  try {
    const { value } = req.body;

    const newTemperature = new Temperature({ value });
    await newTemperature.save();
    await testAll();
    res.status(200).json(newTemperature);
  } catch (error) {
    console.log(error.message);
  }
};

const submitCO = async (req, res) => {
  try {
    const { value } = req.body;

    const newCO = new CO({ value });
    await newCO.save();
    await testAll();

    res.status(200).json(newCO);
  } catch (error) {
    console.log(error.message);
  }
};

const getLatestData = async (req, res) => {
  try {
    let humidity = await Humidity.find({})
      .select('value createdAt')
      .sort({ createdAt: -1 })
      .limit(1);

    let co = await CO.find({})
      .select('value createdAt')
      .sort({ createdAt: -1 })
      .limit(1);

    let temps = await Temperature.find({})
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

const testAll = async () => {
  try {
    const { humidity, co, temperature } = await getLatestData();

    if (humidity.value > 50 && temperature.value > 35 && co.value >= 100) {
      console.log('ALAAAAAM');
    }
  } catch (error) {}
};

module.exports = { submitCO, submitHumidity, submitTemperature, getLatestData };
