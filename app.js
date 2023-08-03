const express = require('express');
const mongoose = require('mongoose');

// const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const categoryRoute= require("./routes/category.route");
const productRoute= require("./routes/product.routes");
const cartRoute= require("./routes/cart.routes");
const orderRoute= require("./routes/order.routes")
const cookieParser = require('cookie-parser');


const app=express()
app.use(cookieParser());
const connect = async () =>{
    try{
        await mongoose.connect("mongodb+srv://rc:rc@cluster0.qc8e5u6.mongodb.net/ecommerce?retryWrites=true&w=majority");
        console.log("Connected to Mongo DB")
    }catch(err){
        console.log(err);
    }
};

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/category",categoryRoute);
app.use("/api/product",productRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order",orderRoute);

app.listen(8801,() =>{
    connect();
    console.log("Server is running");
})