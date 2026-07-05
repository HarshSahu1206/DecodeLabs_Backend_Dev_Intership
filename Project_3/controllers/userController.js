const User = require('./../models/userModel')


exports.me = async(req, res) => {

    try{
        const user = await  User.findById(req.user._id)
        res.status(200)
        .json({
            status: "success",
            user
        })

    }catch(err){
        res.status(500)
        .json({
            status:"fail",
            message: err.message
        })
    }
}

