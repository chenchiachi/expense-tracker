const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req,res) => {
  res.send('This is Express-Tracker project.') 
}) 

app.listen(PORT, () => {
  console.log(`The express server is running on http://localhost:${PORT}`)
})