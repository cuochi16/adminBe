const mongoose = require("mongoose");
const { Schema } = mongoose;

const typeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
});

const Type = mongoose.model("Type", typeSchema);
module.exports = Type;