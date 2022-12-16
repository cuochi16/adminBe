const mongoose = require('mongoose');
const {Schema} = mongoose;

const supportSchema = new Schema({
    name: {
        type: String,
        trim:true,
    },
    username: {
        type: String,
        trim:true,
    },
    email: {
        type: String,
        trim:true,
    },
    phoneNumber: {
        type: String,
    },
    title: {
        type: String,
    },
    messsage: {
        type: String,
    },
    isAnswered: {
        type: String,
    },
    create_at: {
        type: Date,
    },
    update_at: {
        type: Date,
    }
});

const Support = mongoose.model('Support', supportSchema);


module.exports = Support;