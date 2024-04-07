const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    credits: { type: Number, default: 0 }
})

module.exports = mongoose.model('users', userSchema)