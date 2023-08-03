const express = require("express");
const {addCategory,getCategory}= require("../controllers/category.contoller");

const router=express.Router();

router.post("/add",addCategory);
router.get("/get", getCategory);

module.exports=router;

