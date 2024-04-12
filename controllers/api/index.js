const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRout = require('./blogRout');

router.use('/users', userRoutes);

router.use('/blog',blogRout);

module.exports = router;
