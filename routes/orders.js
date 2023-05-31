const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders');

//get all orders
router.get("/", OrdersController.getAll);

//get order by id
router.get("/:id", OrdersController.getById);

//get order by id
router.post("/", OrdersController.post);

//calculate price
router.post("/calc", OrdersController.calculatePrice);

//delete order by id
router.delete("/:id", OrdersController.deleteById);

module.exports = router;