const express = require('express')
const router = express.Router();

const router_mayumi = require('./routes-mayumi');

router.use ('/', router_mayumi);


module.exports = router;