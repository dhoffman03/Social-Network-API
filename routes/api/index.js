const router = require('express').Router();
const userRoutes = require('./usersRoutes');
const thoughtsRoutes = require('./thoughtsRoutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtsRoutes);

module.exports = router;
