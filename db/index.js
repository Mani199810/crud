const mongoose = require('mongoose')

const connectDb = async (url) => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('database connected')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDb
