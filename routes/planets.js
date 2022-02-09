const express = require('express')
const router = express.Router()

const {getAllPlanets} = require('../controllers/planets')

router.route('/').get(getAllPlanets)

module.exports = router