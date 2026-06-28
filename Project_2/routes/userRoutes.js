const express = require('express')
const router = express.Router()
const User = require('./../models/userModel')

//This route is to get all users 
router.get('/', async (req, res) => {

   try{
    const data = await User.find()
    
    res
        .status(200)
        .json({
            status: "Success",
            results: data.length,
            data
        })
    }
    catch (err) {

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
})

//This route is to get a specific user 
router.get('/:id', async (req, res) => {

    try{

        const data = await User.findById(req.params.id )
        
        if(!data){
          return  res
                .status(404)
                .json({
                    status: "fail",
                    message: "This id does not exists."
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
                status: "fail",
                message: err.message
            })
    }
})


router.post('/', async (req, res) => {
    try{
        
        const newData = await User.create(req.body)

        res
            .status(201)
            .json({
                status: "success",
                data: {
                    User : newData
                }
            })
    } catch (err) {
        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
})

router.patch('/:id', async (req, res) => {
    try{

        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true 
        })

        if(!updateUser){
            return res
                .status(404)
                .json({
                    status: "fail",
                    message: "User not found"
                })
        }

        res
            .status(200)
            .json({
                status: "success",
                data : updateUser
            })
    }catch (err){

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
})


router.delete('/:id', async (req, res) => {

    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id)

        if(!deleteUser){
            return res
                .status(404)
                .json({
                    status: "fail",
                    message: "User not found"
                })
        }

        res
            .status(204)
            .json({
                status: "success",
                data: null
            })
    
    }catch (err){

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
})

module.exports = router