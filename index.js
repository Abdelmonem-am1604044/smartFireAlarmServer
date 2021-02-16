/* eslint-disable no-undef */
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  logger = require('morgan'),
  authRoutes = require('./routes/authRoutes'),
  requireAuth = require('./middlewares/requireAuth'),
  http = require('http').createServer(app),
  io = require('socket.io')(http),
  controller = require('./controllers/index');

app.use(express.json({ extended: false }));

app.use(logger('dev'));
app.use(authRoutes);

// define routes
app.post('/humidity', requireAuth, controller.submitHumidity);
app.post('/temp', requireAuth, controller.submitTemperature);
app.post('/co', requireAuth, controller.submitCO);



app.get('/data', requireAuth, controller.getLatestData);

mongoose
  .connect('mongodb://127.0.0.1:27017/smartFireAlarm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => {
    console.log(error.message);
  });

io.on('connection', (socket) => {
  console.log('a user connected');
});

global.io = io;

http.listen(port, () => {
  console.log(`Server started @ http://localhost:${port}`);
});
