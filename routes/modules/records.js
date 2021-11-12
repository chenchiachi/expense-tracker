const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const dayjs = require('dayjs')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return Category.find()
    .then((category) => {
      return res.render('new', { category: category.map(category => category.toJSON()) })
    })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, categoryId, amount } = req.body
  return Record.create({ name, date, categoryId, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .lean()
    .then(record => {
      record.date = dayjs(record.date).format('YYYY-MM-DD')
      return Category.find()
        .then((category) => {
          record.categoryId = record.categoryId.toString()
          return res.render('edit', { record, category: category.map(category => category.toJSON()) })
        })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, categoryId, amount } = req.body
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.categoryId = categoryId
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router