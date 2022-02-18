const express = require('express') 
const path = require('path') 
const hbs = require('hbs')

const loginRouter = require('./routers/login')
const mainRouter = require('./routers/main') 
const createAccRouter = require('./routers/create-account')
const coolRouter = require('./routers/cool')
const aboutRouter = require('./routers/about')
const gameRouter = require('./routers/game')
const dragDropRouter = require('./routers/dragDrop')
const _404Router = require('./routers/404')

const app = express() 

const dir = path.join(__dirname, "../public") 
app.use(express.static(dir)) 

app.set('view engine','hbs')

const viewsPath = path.join(__dirname, "../templates")
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

app.use(loginRouter)
app.use(mainRouter)
app.use(createAccRouter)
app.use(coolRouter)
app.use(aboutRouter)
app.use(gameRouter)
app.use(dragDropRouter)
app.use(_404Router)

const port = process.env.PORT || 3000 
app.listen(port, () => { 
    console.log('Server is up on port ' + port) 
})