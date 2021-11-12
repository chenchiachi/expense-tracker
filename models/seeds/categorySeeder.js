if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Category = require('../category')
const db = require('../../config/mongoose')

const categorySeeder = require('./seeds.json').categorySeeds

db.once('open', () => {
  Promise.all(Array.from(categorySeeder, seedCategory => {
    return Category.findOne({ 'name': seedCategory.name }).then(category => {
      if (category === null) {
        return Category.create(seedCategory)
      }
    })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})