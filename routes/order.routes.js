const { placeOrder ,orderHistory, getOrderDetails} = require("../controllers/order.controller");
const verifyToken = require("../middleware/jwt");

const express = require("express");

const router= express.Router();

router.post("/place-order",verifyToken,placeOrder);
router.get("/orderhistory",verifyToken,orderHistory);
router.get("/orderdetails/:orderId",getOrderDetails);

module.exports=router;