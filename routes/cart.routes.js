const express = require("express");
const { addToCart, viewCart, updateCart, deleteCartItem } = require("../controllers/cart.controller");
const verifyToken = require("../middleware/jwt");

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/view", verifyToken, viewCart);
router.put("/update-cart/:productId", verifyToken, updateCart);
router.delete("/remove/:productId", verifyToken, deleteCartItem);

module.exports=router;
