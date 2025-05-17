const express = require('express')
const router = express.Router();

const router_mayumi = require('./routes-mayumi');
const router_leticia = require('./routes-leticia');
const router_caique = require('./routes-caique');
const router_otavio = require('./routes_otavio');

router.use ('/', router_mayumi);
router.use ('/', router_leticia);
router.use ('/', router_caique);
router.use ('/', router_otavio);

module.exports = router;