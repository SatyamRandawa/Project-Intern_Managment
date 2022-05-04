

const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')

router.post('/functionup/colleges', controller.createColleges)
router.post('/functionup/interns', controller.createInterns)
module.exports = router;