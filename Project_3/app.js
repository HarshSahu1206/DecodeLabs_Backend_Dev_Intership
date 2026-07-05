const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')    

dotenv.config({path: './config.env'})

const userRoutes = require('./routes/userRoutes')

const app = express()
app.use(express.json())

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB)
    .then(() => console.log("DATABASE Connected Successfully!"))
    .catch(err => console.log("DB Error: ",err))


app.use('/api/users', userRoutes)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})