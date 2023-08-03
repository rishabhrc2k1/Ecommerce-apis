const Order = require("../models/order.model")
const User = require("../models/user.model")
const Product = require("../models/product.model")

const placeOrder = async (req,res) =>{
    try{

        const userId=req.userId;
        const user= await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found");
        }

        if (user.cart.length === 0) {
            return res.status(400).send("Cart is empty");
        }
        
        let totalAmount = 0;
        for (const cartItem of user.cart) {
          const product = await Product.findById(cartItem.productId);
          if (!product) {
           return res.status(404).send(`Product with ID ${cartItem.productId} not found`);
          }
        totalAmount += product.price * cartItem.quantity;
        }

        const order = new Order({
            userId: user._id,
            products: user.cart.map((item) =>({
               productId: item.productId,
               quantity: item.quantity,
            })),
            totalAmount: totalAmount,
        })
        await order.save();
        user.orders.push(order._id);
        user.cart = [];
        await user.save();
        res.status(201).send("Order placed successfully");

    }catch(err){
       console.log(err);
       res.status(500).send("Something went wrong!!");
    }
}

const orderHistory = async (req,res) =>{
    try{
    const userId=req.userId;
    const orders= await Order.find({userId}).exec();
    
    if (!orders) {
        return res.status(404).send("Order history not found");
    }
    res.status(200).json(orders);
    }catch(err){
        console.error("Error while fetching order history:", err);
        res.status(500).send("Something went wrong while fetching order history");
    }
  
}

const getOrderDetails = async(req,res) =>{
    try{
        const userId = req.userId;
        const orderId = req.params.orderId;

        const order = await Order.findOne({ _id: orderId }).exec();

        if (!order) {
           return res.status(404).send("Order not found");
        }
        res.status(200).send(order);
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong!!");
    }
}

module.exports={placeOrder,orderHistory,getOrderDetails};