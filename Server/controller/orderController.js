const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');
const Order = require("../model/orderModel");

exports.addOrder = async (req,res,next) => {
    const order = await Order.create(req.body);
    return res.status(201).json({
        status:"success",
        order
    })
}

exports.updateOrder = async(req,res,next) => {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
      });
    if(!order) {
        console.log("no course");
        return;
    }
    console.log(order);
    return res.status(200).json({
        status:"success",
        order
    })
}

exports.deleteOrder = async(req,res,next) => {
    const id = req.params.id;
    const order = await Order.findByIdAndDelete(id);
    if(!order) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"Deleted successfully !"
    })
}

exports.getById = async(req,res,next) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    if(!order) {
        return res.status(204).json({
            status:"No content",
        })
    }

    return res.status(200).json({
        status:"success",
        order
    })
}

exports.getAll = async (req,res,next) => {
    const filter = {}
    const orders = await Order.find(filter);
    return res.status(200).json({
        status:"success",
        orders
    })
}
