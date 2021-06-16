const router = require('express').Router();

const apiRoutes = require('./api/index');
const htmlRoutes = require('./html/html-routes');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

module.exports = router;