const express = require('express')
const dayjs = require('dayjs')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const filteredCategory = req.query.categoryId || ''
  Category.find().then((category) => {
    let filteredRecord = {}
    if (filteredCategory) {
      filteredRecord = { 'categoryId': filteredCategory }
    }

    Record.find({ userId, ...filteredRecord })
      .lean()
      .then(records => {
        records.forEach(record => {
          const recordCategoryIndex = category.findIndex(obj => obj._id.toString() === record.categoryId.toString())
          record.icon = category[recordCategoryIndex].icon || ''
          record.date = dayjs(record.date).format('YYYY-MM-DD')
          totalAmount += record.amount
        })
        res.render('index', { records, category, totalAmount, filteredCategory })
      })
      .catch(error => console.error(error))
  })
})

module.exports = router