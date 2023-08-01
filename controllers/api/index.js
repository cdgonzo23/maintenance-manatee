const router = require('express').Router();
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');
const vehicleRoutes = require('./vehicle-routes');

router.use('/post', postRoutes);
router.use('/user', userRoutes);
router.use('/vehicle', vehicleRoutes);


module.exports = router;