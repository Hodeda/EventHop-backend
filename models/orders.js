const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {type: String, required: true, maxLength: 20},
    destination: {type: String, required: true, maxLength: 50},
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
module.exports = {Order};