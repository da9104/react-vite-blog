const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, default: 'Miscellaneous', enum: ['Business', 'Inspo', 'Education', 'Art', 'Entertainment', 'Book', 'Blog', 'Miscellaneous'], message: "{VALUE}is not supported" },
    description: String,
    thumbnail: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
}, {timestamps: true})

module.exports = mongoose.model('posts', postSchema)