const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: [true, "Age is required."],
        min: [0, "Age can't be Negative."]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})


const User = mongoose.model('User', userSchema)

module.exports = User
