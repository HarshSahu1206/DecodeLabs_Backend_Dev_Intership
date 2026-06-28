const express = require('express')


const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(express.json())

app.use('/api/products', productRoutes)


const port = 7000
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    
})
