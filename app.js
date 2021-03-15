const express = require('express')
const exphbs = require('express-handlebars')
const dotenv = require('dotenv')
const session = require('express-session')
const connectDB = require('./config/db')
const passport = require('passport')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const formatDate = require('./helpers/Formatdate')
const app = express()
const PORT = 3000
app.use(require('morgan')('dev'))
// load dotenv config
dotenv.config()
connectDB()
require('./config/passport')(passport)
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//handlebars
//extname/default:main.hbs
app.engine('.hbs',exphbs({defaultLayout:'main','extname':'.hbs',helpers:{formatDate}}))
//viewEngine aswell
app.set('view engine','.hbs')

app.use(session({
    secret:'keyboard',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(methodOverride(function (req,res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

// bodyparser
// routes
app.use('/auth',require('./routes/auth'))
app.use('/notes',require('./routes/notes'))
app.use('/',require('./routes/index'))
app.listen(PORT,console.log(`Listening on ${PORT}`))
