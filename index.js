const express = require('express')
const app =express()
const cors = require('cors')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./router')
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const db = require('./db.config/db.config.js')
require('dotenv').config()

db.connect((err) =>{
    if (err) {
        console.error(err);
        return;
    }
    console.log('Database Connected');
});

app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(cookieParser())
app.use(cors())


app.use('/', userRouter)

app.get('/', async (req, res) => {
  try {
    res.send(`Welcome Page`);
  } catch (error) {
    console.log(error);;
  }
});


PORT = process.env.PORT || 1008
app.listen(PORT, () => {console.log(`Application is running on ${PORT}!! `)})