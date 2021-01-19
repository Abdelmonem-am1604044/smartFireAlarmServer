/* eslint-disable no-undef */
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  logger = require('morgan'),
  controller = require('./controllers/index');

app.use(express.json({ extended: false }));

app.use(logger('dev'));

// define routes
app.post('/humidity', controller.submitHumidity);
app.post('/temp', controller.submitTemperature);
app.post('/co', controller.submitCO);

app.get('/data', controller.getLatestData);

//Or use 'mongodb://127.0.0.1:27017/smartFireAlarmSystem'
mongoose.connect('mongodb://localhost:27017/smartFireAlarmSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server started @ http://localhost:${port}`);
});
