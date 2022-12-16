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
    },
    isDone: {
        type:String,
        enum:["pending","successful","unsucessful"],
        default: "pending"
    },
},{
    timestamps:true
})

orderSchema.pre(/^find/, function(next) {
    this.populate({path:"user",select:"name email _id"})
    this.populate({path:"type",select:"name price"})
    next();
}) 

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;