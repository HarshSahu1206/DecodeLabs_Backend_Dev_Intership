const express = require('express')
const dotenv = require('dotenv')
const newsRoutes = require('./routes/newsRoutes')


dotenv.config({path: './config.env'})

const app = express()
app.use(express.json())

app.use('/api/news', newsRoutes)

const port = process.env.PORT || 9000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);

})