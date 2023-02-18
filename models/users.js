const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    scores: {
        menja: {type: Number},
        cjump: {type: Number},
        puzzle: {type: Number},
        towerb: {type: Number},
        exagon: {type: Number}
    }
    
})


const User = mongoose.model('User', userSchema)

module.exports = User