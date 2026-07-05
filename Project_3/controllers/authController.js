const User = require('./../models/userModel')
const jwt = require('jsonwebtoken')
const {promisify} = require('util')

exports.signup = async(req, res) => {

   try{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
        })
        res
            .status(201)
            .json({
                status: 'success',
                newUser
            })
    
    }
    catch(err) {

        res
            .status(400)
            .json({
                status: "fail",
                message: err.message
            })
    }
}

exports.login = async(req, res) => {

    try{

        const {email, password} = req.body

        if(!email || !password){
            res
                .status(500)
                .json({
                    status: "fail",
                    message: "Please enter email and password."
                })
        }

        const user = await User.findOne({email}).select('+password')

        if(!user || !await user.passwordCheck(password, user.password)){
            res
                .status(401)
                .json({
                    status: "fail",
                    message: 'Enter email or password is wrong.'
                })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
           
            expiresIn: process.env.JWT_EXPIRES
        })

        res
            .status(200)
            .json({
                status: "success",
                token
            })
    } catch (err) {

        res 
            .status(500)
            .json({
                status:"fail",
                message: err.message
            })
    }
}

exports.protect = async(req, res, next) => {

    try{

        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

            token = req.headers.authorization.split(' ')[1]
        }

        if(!token){
            return res
                .status(401)
                .json({
                    status: "fail",
                    message: "Token not found, Please login."
                })
        }

        const details = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

        const user = await User.findById(details.id)

        if(!user){
            return res
                .status(401)
                .json({
                    status: "fail",
                    message: "The user beloging to this token does not exist"
                })
        }

        req.user = user
        next()

    }catch (err) {

        res
            .status(500)
            .json({
                status: "fail",
                message: err.message
            })
    }
}