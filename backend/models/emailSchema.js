const mongoose = require('mongoose')

const {Schema} = mongoose

const emailSchema = new Schema({
    email: {type: String},
    // suggestion: {type: String}
})

const Email = mongoose.model('userEmails', emailSchema )
module.exports = Email
