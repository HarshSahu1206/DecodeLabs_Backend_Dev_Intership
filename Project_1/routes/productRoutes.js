const express = require('express')
const router = express.Router()

const products = [
  { id: 1, name: 'Blood Pressure Monitor', price: 1500 },
  { id: 2, name: 'Stethoscope', price: 3000 },
  { id: 3, name: 'Pulse Oximeter', price: 800 },
];


//this route is to get all products at once 
router.get('/', async (req, res) => {

    try {

        const data = products
        res 
            .status(200)
            .json({
                status: "success",
                results: products.length,
                data 
            })
    }
    catch (err){
        res
            .status(404)
            .json({
                status: "fail",
                message : err.message
            })
    }
})

// this route is to gte a single product

router.get('/:id', async (req, res) => {

    try {
        const data = products.find( p => p.id === req.params.id * 1 )

        if(!data){
            return res 
                .status(404)
                .json({
                    status: "fail",
                    message: "Data Not Found"
                })
        }
        res 
            .status(200)
            .json({
                 status: "success",
                data
            })
        
       
    }
    catch (err) {
        res 
            .status(500)
            .json({
                status: "error",
                message: err.message
            })
    }
})

// Now this route is to add a new product form user 
router.post('/', async (req, res) => {

    try{

        const newProduct = { 
            id: products.length + 1,
            ...req.body 
        }
        products.push(newProduct)

        res
            .status(201)
            .json({
                status: "success",
                data: newProduct
            })
    }
    catch (err) {

        res
            .status(500)
            .json({
                status: "error",
                message: err.message
            })
    }
})

module.exports = router

