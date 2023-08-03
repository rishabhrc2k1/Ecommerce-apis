const userModel = require("../models/user.model");
const User = require("../models/user.model");

const addToCart = async (req,res) =>{
    try{
       const userId=req.userId;
       const user= await User.findById(userId);
       
       if (!user) {
        return res.status(404).send("User not found");
       }

       const {productId, quantity } = req.body;
       user.cart.push({ productId, quantity });

       await user.save();
       res.status(200).send("Product added to the cart");
   
    }catch(err){
        res.status(500).send("Something went wrong!!");
    }
}

const viewCart = async(req,res) =>{

    try{
    const userId=req.userId;
    const user= await User.findById(userId);

    if (!user) {
        return res.status(404).send("User not found");
    }
    
    res.status(200).send({cart: user.cart});
    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong!!");
    }

}

const updateCart = async (req,res) =>{

    try{
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
        return res.status(404).send("User not found");
    }
    const {productId}=req.params;
    const {quantity}=req.body;

    const cartProduct= user.cart.find((item) => item.productId.toString() === productId);
    

    if (!cartProduct) {
        return res.status(404).send('Product not found in the cart' );
    }
    cartProduct.quantity=quantity;
    user.save();
    res.status(200).send("Cart item quantity updated");
    } catch(err){
        console.log(err);
        res.status(500).send("Something went wrong!!");
    }
}

const deleteCartItem = async (req,res)=>{
    
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).send("User not found");
        }
    
        const { productId } = req.params; 
        const index = user.cart.findIndex((item) => item.productId.toString() === productId);
    
        if (index === -1) {
          return res.status(404).send("Product not found in the cart");
        }
    
        user.cart.splice(index, 1);
        await user.save();
        res.status(200).send("Product removed from the cart");

      } catch (err) {
        
        console.log(err);
        res.status(500).send("Something went wrong!!");
      }
}

module.exports= {addToCart,viewCart,updateCart,deleteCartItem};