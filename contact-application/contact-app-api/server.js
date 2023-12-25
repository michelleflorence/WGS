const express = require('express');
require('dotenv').config()
const contactRouter = require('./route/contact.js');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/contact', contactRouter)

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`)
})