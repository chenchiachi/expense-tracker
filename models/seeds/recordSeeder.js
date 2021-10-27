const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const db = require('../../config/mongoose')
const User = require('../user')
const SEED_USER = [
  {
    name: '廣志',
    password: '123456',
    recordListIndex: [0, 1, 2, 4]
  },
  {
    name: '小新',
    password: '123456',
    recordListIndex: [3]
  }
]

const recordList = [{
  id: 1,
  name: '午餐',
  date: new Date('2019-04-23'),
  amount: 60,
  category: '餐飲食品'
},
{
  id: 2,
  name: '晚餐',
  date: new Date('2019-04-23'),
  amount: 60,
  category: '餐飲食品'
},
{
  id: 3,
  name: '捷運',
  date: new Date('2019-04-23'),
  amount: 120,
  category: '交通出行'
},
{
  id: 4,
  name: '電影：驚奇隊長',
  date: new Date('2019-04-23'),
  amount: 220,
  category: '休閒娛樂'
},
{
  id: 5,
  name: '租金',
  date: new Date('2015-04-01'),
  amount: 25000,
  category: '家居物業'
}]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, seedUser => {
    return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(seedUser.password, salt))
    .then(hash => User.create({
      name: seedUser.name,
      password: hash,
    }))
    .then(user => {
      const userId = user._id
        const recordData = seedUser.recordListIndex.map(i => {
          recordList[i].userId = userId
          return recordList[i]
        })
        return Record.create(recordData)
      })
  }))
    .then(() => {
      console.log('done')
      process.exit()
    })
})



// db.once('open', () => {

//   recordList.forEach(record => {
//     Record.create({
//       id: record.id,
//       name: record.name,
//       date: record.date,
//       amount: record.amount,
//       category: record.category
//   })
//   })
//   console.log('Done')
// })