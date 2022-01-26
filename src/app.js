const express = require('express') 
const path = require('path') 

const mainRouter = require('../routers/main')
const indexRouter = require('../routers/index') 
const loginRouter = require('../routers/login')
const createAccRouter = require('../routers/create-account')
const coolRouter = require('../routers/cool')
const aboutRouter = require('../routers/about')
const gameRouter = require('../routers/game')
const _404Router = require('../routers/404')

const app = express() 

const dir = path.join(__dirname, "../public/") 
app.use(express.static(dir)) 

app.use(mainRouter)
app.use(indexRouter) 
app.use(loginRouter)
app.use(createAccRouter)
app.use(coolRouter)
app.use(aboutRouter)
app.use(gameRouter)
app.use(_404Router)

const port = process.env.PORT || 3000 
app.listen(port, () => { 
    console.log('Server is up on port ' + port) 
})