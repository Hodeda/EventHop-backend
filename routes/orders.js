const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders');

//calculate price
router.post("/calc", OrdersController.calculatePrice);

//get all orders
router.get("/", OrdersController.getAll);

//get order by id
router.get("/:id", OrdersController.getById);

//post order
router.post("/", OrdersController.post);

//delete order by id
router.delete("/:id", OrdersController.deleteById);

module.exports = router;