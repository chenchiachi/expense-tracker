const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const db = require('../../config/mongoose')
const User = require('../user')
const Category = require('../category')
const userSeeder = require('./seeds.json').userSeeds
const recordSeeder = require('./seeds.json').recordSeeds

db.once('open', () => {
  Promise.all(Array.from(userSeeder, seedUser => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash,
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(seedUser.recordListIndex.map(i => {
          return Category.findOne({ name: recordSeeder[i].category })
            .then(category => {
              const categoryId = category._id
              recordSeeder[i].categoryId = categoryId
              recordSeeder[i].userId = userId
              return recordSeeder[i]
            }).then(recordData => {
              return Record.create(recordData)
            })
        })
        )
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})
