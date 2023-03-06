const router = require('express').Router();
const travellerRoutes = require('./productRoutes');
const locationRoutes = require('./categoryRoutes');
const tripRoutes = require('./tagRoutes');

router.use('/travellers', travellerRoutes);
router.use('/locations', locationRoutes);
router.use('/trips', tripRoutes);

module.exports = router;
