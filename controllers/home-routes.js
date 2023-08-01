const router = require('express').Router();
const { User, Vehicle, Post } = require('../models');
const authorize = require('../utils/authorize');

router.get('/', authorize, async (req, res) => {
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
        if (!user) res.status(404).json({message: "No user found."});
        res.render('homepage', {user})
    } catch (err) {
        res.status(500).json(err);
    };
})

module.exports = router;