const asyncHandler = require("express-async-handler");
const { Order } = require("../models/orders");
const { sendEmail } = require("./utils");
const axios = require("axios");

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
  console.log(req.body);
  const {
    pickup_longitude,
    pickup_latitude,
    dropoff_longitude,
    dropoff_latitude,
    passenger_count,
    Pickup_Year,
    Pickup_Month,
    Pickup_Day,
    Pickup_Hour,
    Pickup_Minute,
    Pickup_DayOfWeek,
    Euclidean_Distance,
    DayHour,
  } = req.body;

  const baseUrl = "http://3.70.175.138:8080/predict_flare";

  const url = `${baseUrl}?pickup_longitude=${pickup_longitude}&pickup_latitude=${pickup_latitude}&dropoff_longitude=${dropoff_longitude}&dropoff_latitude=${dropoff_latitude}&passenger_count=${passenger_count}&Pickup_Year=${Pickup_Year}&Pickup_Month=${Pickup_Month}&Pickup_Day=${Pickup_Day}&Pickup_Hour=${Pickup_Hour}&Pickup_Minute=${Pickup_Minute}&Pickup_DayOfWeek=${Pickup_DayOfWeek}&Euclidean_Distance=${Euclidean_Distance}&DayHour=${DayHour}`;

  try {
    const response = await axios.get(url);
    console.log(response.data); // Log the data from the response
    res.status(200).json(response.data); // Respond with the data from the axios request
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating the price." });
  }
});

exports.post = async (req, res) => {
  const { firstName, lastName, email, phone, passengers, arrivalTime, price } =
    req.body;
  if (!(firstName && lastName && email && phone && passengers && arrivalTime)) {
    //todo: later add price to also be required
    return res.status(400).send("All input is required");
  }

  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    sendEmail(email);

    res.status(200).send(savedOrder);
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.deleteById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteResult = await Order.deleteOne({ _id: id });
  res.status(200).send(deleteResult);
});
