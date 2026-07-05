const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide right email.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Confirm password is required.'],
        validate: {
            validator: function(str){
                return str === this.password
            },
            message: 'Password and Confirm Password should be same.'
        },
        select: false
    }
}, {timestamps: true})


userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)

    this.passwordConfirm = undefined
})

userSchema.methods.passwordCheck = async function(candidatePassword, userPassword){

    return await bcrypt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)
module.exports = User