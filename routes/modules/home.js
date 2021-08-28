const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()

const Record = require('../../models/record')
const CATEGORY = {
  家居物業: "fas fa-home",
  交通出行: "fas fa-shuttle-van",
  休閒娛樂: "fas fa-grin-beam",
  餐飲食品: "fas fa-utensils",
  其他: "fas fa-pen"
}

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        record.icon = CATEGORY[record.category]
        record.date = dayjs(record.date).format('YYYY-MM-DD')
      })
     res.render('index', { records })
    })
    .catch(error => console.error(error))
})

module.exports = router