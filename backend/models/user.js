const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    image: String,
    isSubscribed: {type: String},
    password:{type:String},
    questions:{
        type:[String]
    },
    solvedQuestions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'interview'
        }
    ],
})

const User = mongoose.model('User',userSchema)

module.exports = User