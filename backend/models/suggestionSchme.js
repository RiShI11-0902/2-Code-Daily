const mongoose = require('mongoose')

const {Schema} = mongoose

const sugesstionSchema = new Schema({
    name: {type: String},
    suggestion: {type: String}
})

const Suggestion = mongoose.model('suggestion', sugesstionSchema )
module.exports = Suggestion
