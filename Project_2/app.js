const express = require('express')
const dotenv = require('dotenv')

dotenv.config({path : './config.env'})


const userRoutes = require('./routes/userRoutes.js')
const { log } = require('console')

const app = express()
app.use(express.json())

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)


const mongoose = require('mongoose')

mongoose.connect(DB)
    .then(con => {
        console.log("DB Connected successfullly!");
        
    })
    .catch(err => {
        console.log("DB: error",err);
        
    })

app.use('/api/users',userRoutes)

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`Sever running on port ${port}`);
    
})