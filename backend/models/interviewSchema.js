const mongoose = require('mongoose')
const {Schema} = mongoose

const interviewSchema = new Schema({
    problem: {
        type: String,
        required: true
    },
    questions:{
        type:[String]
    },
    answers:{
        type: [String],
        default: []
    },
    feedback:{
        type: String
    },
    correctness:{type: Number},
    time: {type: Number},
    createdAt: {type: Date}
})

const Interview = mongoose.model('interview', interviewSchema)

module.exports = Interview