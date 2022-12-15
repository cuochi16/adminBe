const mongoose = require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: "Type",
        required: true
    }
})