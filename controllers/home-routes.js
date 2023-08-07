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

    res.render('homepage', { user, loggedIn: req.session.loggedIn, firstName: req.session.firstName })
   
  } catch (err) {
        res.status(500).json(err);
    };
});

router.get('/vehicle/:id', authorize, async (req, res) => {
  try {
    const vehicleId = req.params.id
    const vehicle = await Vehicle.findByPk(req.params.id);
    const postData = await vehicle.getPosts();
    const unsortedPosts = postData.map((vehiclePost) => vehiclePost.get({ plain: true }))
    const posts = unsortedPosts.reverse();
    if (!posts) res.status(404).json({message: 'No vehicle found.'});
    res.render('maintenance-posts', { title: vehicle.makeAndModel(), nickname: vehicle.nickname, posts, loggedIn: req.session.loggedIn, userId: req.session.userId, firstName: req.session.firstName, vehicleId });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get(`/add-vehicle`, authorize, async (req, res) => {
      try {
        const userId = req.session.userId;
        const loggedIn = req.session.loggedIn;
        const firstName = req.session.firstName;
        return res.render('add-vehicles', {userId, loggedIn, firstName});
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }

});

router.get("/edit-vehicle/:id", authorize, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findByPk(req.params.id);
    const vehicle = vehicleData.get({ plain: true });
    res.render("edit-vehicle", { vehicle, firstName: req.session.firstName, userId: req.session.userId, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/add-post/:id', authorize, async (req, res) => {
  try {
    const vehicleData = await Vehicle.findByPk(req.params.id);
    const vehicle = vehicleData.get({ plain: true });
    return res.render('add-post', {
      vehicle,
      vehicleId: vehicle.id,
      firstName: req.session.firstName, 
      userId: req.session.userId,
      loggedIn: req.session.loggedIn,
      title: vehicleData.makeAndModel()
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get("/edit-post/:id", authorize, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [Vehicle]
    });
    const vehicle = postData.vehicle;
    const post = postData.get({ plain: true });
    res.render("edit-post", { post, firstName: req.session.firstName, userId: req.session.userId, loggedIn: req.session.loggedIn, title: vehicle.makeAndModel() });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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