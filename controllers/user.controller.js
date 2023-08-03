const User= require("../models/user.model")
import bcrypt from "bcrypt";

const register = async (req,res) =>{
    
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
          ...req.body,
          password: hash,
        });
    
        await newUser.save();
        res.status(201).send("User has been created.");
      } catch (err) {
        res.status(500).send("Something went wrong!!");
      }

}
module.exports={register};