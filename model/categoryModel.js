const mongoose = require('mongoose')

const CategoryModel = new mongoose.Schema({
        id: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        marks: {
            type: String,
            required: true,
            trim: true
        },
        result: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        }
},{
    collection: "category",
    timestamps: true
})

module.exports = mongoose.model("Category", CategoryModel)