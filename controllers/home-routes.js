const router = require('express').Router();
const { User, Vehicle, Post } = require('../models');
const authorize = require('../utils/authorize');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findOne({
           where: {
            id: req.session.userId
           },
           include: [
            {
            model: Vehicle
           } 
        ],
        });
        const user = userData.get({ plain: true });
        if (!user) res.status(404).json({message: 'No user found.'});
        res.render('homepage', { user })
    } catch (err) {
        res.status(500).json(err);
    };
})

router.get('/vehicle/:id', authorize, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findOne({
      where: {
        id: req.params.id
      }
    },
    {
      include: [
        {
          model: Post
        }
      ]
    });
    const vehicle = vehicleData.get({ plain: true });
    if (!vehicle) res.status(404).json({message: 'No vehicle found.'});
    res.render('maintenance-posts', { vehicle });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

module.exports = router;