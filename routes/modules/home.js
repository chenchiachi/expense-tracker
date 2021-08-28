const express = require('express')
const record = require('../../models/record')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router