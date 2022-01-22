const path = require('path')
const express = require('express')

// Set up express
app = express()

// Define paths for Express config
const dir = path.join(__dirname, '../public')

// Set up static directory to serve
app.use(express.static(dir))

// App pages

app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"))
}) 

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/about.html"))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../public/game.html"))
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})