const jwt = require('jsonwebtoken'),
  User = require('../models/User');

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

    const { userId } = payload,
      user = await User.findById(userId);
    req.user = user;
    next();
  });
};
