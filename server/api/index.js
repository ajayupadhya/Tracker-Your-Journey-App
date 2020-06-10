require('./model/user')
require('./model/track')
const express = require('express');
const authRoute = require('../api/routes/authroutes')
const mongoose = require('mongoose');
const bodypaser = require('body-parser')
const trackRoute = require('../api/routes/trackroutes')

const requireAuth = require('./middleware/requireAuth')
let app = express()
app.use(bodypaser.json())
app.use(authRoute)
app.use(trackRoute)

const mongoURI = 'mongodb+srv://ajay:Aj@12345@cluster0-ty4ab.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect(mongoURI ,{
    useNewUrlParser :true,
    useCreateIndex : true,
    useUnifiedTopology :true
})

mongoose.connection.on('connected' , () => {console.log("mongo db connected")})
mongoose.connection.on('error' , (err) => {console.log("mongo db erroe" , err)})


app.get('/', requireAuth, (req, res) => res.send(`Your Email ${req.user.email}`))

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))



