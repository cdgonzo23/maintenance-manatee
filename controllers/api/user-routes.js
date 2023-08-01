const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
    const newUserData = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.firstName = newUserData.firstName;
        req.session.userId = newUserData.id

        res.status(200).json(newUserData);
    })
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!userData) res.status(400).json({ message: 'Incorrect email or password.'});
        
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) res.status(400).json({ message: 'Incorrect email or password.'});

        res.status(200).json({ message: 'Successfully logged in!'});
    } catch (err) {
        res.status(500).json(err);
    };
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;