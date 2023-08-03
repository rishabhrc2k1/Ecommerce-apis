const express = require("express");
const { getProduct, addProduct, getOneProduct } = require("../controllers/product.controller");
const router= express.Router();

router.post("/add",addProduct);
router.get("/get/:categoryId",getProduct);
router.get("/getsingleproduct/:productId",getOneProduct);

module.exports=router;