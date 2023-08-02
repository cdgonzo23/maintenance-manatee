const router = require('express').Router();
const { User, Vehicle, Post } = require('../models');
const authorize = require('../utils/authorize');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/homepage');
    return;
  }

  res.render('get-started');
});

router.get('/homepage', authorize, async (req, res) => {
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
    if(!userData) res.json({message: 'no user data'});

    res.render('homepage', { user, loggedIn: req.session.loggedIn })
   
  } catch (err) {
        res.status(500).json(err);
    };
});

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

router.get("vehicle/add", authorize, async (req, res) => {
  try {
    res.render("add-vehicle")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get("vehicle/edit/:id", authorize, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findByPk(req.params.id);
    const vehicle = vehicleData.get({ plain: true })
    res.render("add-vehicle")
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})

module.exports = router;