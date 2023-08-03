const User = require("../models/user.model.js")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const secretKey = 'your_secret_key';
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

const login = async (req,res)=>{

  try{
    const user = await User.findOne({username: req.body.username});
    if (!user) return res.status(404).send("User not found");

    const isCorrect = bcrypt.compareSync(req.body.password,user.password);
    if(!isCorrect)
      return res.status(400).send("Wrong password!!");

    const token = jwt.sign(
      {
        id: user._id,
      },
      secretKey
    )
    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);

  }catch(err){
    console.log(err);
    res.status(500).send("Something went wrong!!");
  }

}

const logout = async(req,res)=>{

  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");

}

module.exports={register,login,logout};

