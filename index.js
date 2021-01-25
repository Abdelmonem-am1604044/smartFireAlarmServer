/* eslint-disable no-undef */
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  logger = require('morgan'),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  controller = require('./controllers/index');

app.use(express.json({ extended: false }));

app.use(logger('dev'));

// define routes
app.post('/humidity', controller.submitHumidity);
app.post('/temp', controller.submitTemperature);
app.post('/co', controller.submitCO);

app.get('/data', controller.getLatestData);

mongoose.connect('mongodb+srv://smartalarm:smart@cluster0.cs2tg.mongodb.net/smart?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(error => {console.log(error.message)})

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(port, () => {
  console.log(`Server started @ http://localhost:${port}`);
});
