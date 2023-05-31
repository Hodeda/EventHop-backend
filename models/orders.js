const mongoose = require("mongoose");

const rString = {type: String, required: true, maxLength: 50};
const orderSchema = new mongoose.Schema({
    firstName: rString,
    lastName: rString,
    email: rString,
    phone: rString,
    passengers: {type: Number, required: true, min: 1, max: 4},
    arrivalTime: {type: Date, required: true},
    price: {type: String, required: false, maxLength: 100},
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
module.exports = {Order};