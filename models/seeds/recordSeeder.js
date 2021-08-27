const Record = require('../record')
const db = require('../../config/mongoose')

const recordList = [{
  id: 1,
  name: "午餐",
  date: new Date("2019-04-23"),
  amount: 60,
  category: "餐飲食品"
},
{
  id: 2,
  name: "晚餐",
  date: new Date("2019-04-23"),
  amount: 60,
  category: "餐飲食品"
},
{
  id: 3,
  name: "捷運",
  date: new Date("2019-04-23"),
  amount: 120,
  category: "交通出行"
},
{
  id: 4,
  name: "電影：驚奇隊長",
  date: new Date("2019-04-23"),
  amount: 220,
  category: "休閒娛樂"
},
{
  id: 5,
  name: "租金",
  date: new Date("2015-04-01"),
  amount: 25000,
  category: "家居物業"
}]



db.once('open', () => {
  recordList.forEach(record => {
    Record.create({
      id: record.id,
      name: record.name,
      date: record.date,
      amount: record.amount,
      category: record.category
  })
  })
  console.log('Done')
})