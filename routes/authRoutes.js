const User = require('../models/User'),
	jwt = require('jsonwebtoken'),
	router = require('express').Router();

router.post('/signup', async (req, res) => {
	const { username, password } = req.body;
	try {
		let user = new User({ username, password });
		await user.save();
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		res.send({ token });
	} catch (error) {
		return res.status(422).send(error.message);
	}
});

router.post('/signin', async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(422).send({ error: 'Must be Logged in' });
	}

	const user = await User.findOne({ username });
	if (!user) {
		return res.status(422).send({ error: 'User Was not found' });
	}

	try {
		await user.comparePassword(password);
		const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
		res.send({ token });
	} catch (error) {
		return res.status(422).send({ error: 'Invalid Password or Username' });
	}
});

module.exports = router;
