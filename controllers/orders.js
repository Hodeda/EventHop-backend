const asyncHandler = require("express-async-handler");
const { Order } = require("../models/orders");

exports.getAll = asyncHandler(async (req, res) => {
    const allOrders = await Order.find();
    res.status(200).send(allOrders);
});

exports.getById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const order = await Order.findById(id);
    res.status(200).send(order);
});

exports.calculatePrice = asyncHandler(async (req, res) => {
    /*
    // add when there is a real algorithm
    // take input from body (this is a POST method handler)
    const { name, destination } = req.body;

    // validate input
    if (!(name && destination)) {
        return res.status(400).send("All input is required");
    }
    */

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const result = randomNumber(50, 150);
    res.status(200).send({result: result});
});

exports.post = asyncHandler(async (req, res) => {
    const { name, destination } = req.body;

    if (!(name && destination)) {
        return res.status(400).send("All input is required");
    }

    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save()
    res.status(200).send(savedOrder);
});

exports.deleteById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const deleteResult = await Order.deleteOne({ _id: id });
    res.status(200).send(deleteResult);
});