const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    googleId: String,
    name: String,
    email: String,
    image: String,
    earlySubscriber: {type: Boolean},
    password:{type:String},
    questions:{
        type:[String]
    },
    isSubscribed: {
        type: Boolean,
        default:false
    },
    solvedQuestions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'interview'
        }
    ],
    payments: [
        {
            order_id: { type: String, required: true },
            payment_id: { type: String, required: true },
            signature: { type: String, required: true },
            amount: { type: Number, required: true },
            status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
            createdAt: { type: Date, default: Date.now },
            expiresAt:{type: Date},
        }
    ],
    currentExpiryDate: {type: Date,  default: null, required: false},
    freeInterview: {type: Number, default: 0},
    improvements: [
        {
            analysis: { type: Object, required: true }, // Change from String to Object
            dateCreated: { type: Date, default: Date.now }, // Default to current date
        },
    ],
})

const User = mongoose.model('User',userSchema)

module.exports = User