const mongoose = require('mongoose')

const blogShcema = new mongoose.Schema({

    salary : {
        type : String, 
        required: true
    } 
})

// create model  ====> name of collection
const Blog = mongoose.model('PaymentCollect', blogShcema)

module.exports = Blog