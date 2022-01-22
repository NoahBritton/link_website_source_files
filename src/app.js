const express = require('express')
const path = require('path')

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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server is up on port ' + port + '.')
})