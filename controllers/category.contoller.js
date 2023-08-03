const Category = require("../models/category.model")

const addCategory = async(req,res)=>{

    try{
      const category=[
        {
            category:"Electronics"
        },
        {
            category:"Books"
        },
        {
            category:"Groceries"
        },
      ];

      const finalCategory = await Category.insertMany(category);
      res.status(201).send("Categories has been added");
    }catch(err){
        res.status(500).send("Something went wrong!");
    }
}
const getCategory= async(req,res)=>{
   try{
     const categories = Category.find();
     res.status(200).send(categories);  
    }catch(err){
        
    res.status(400).send("Something went wrong!!");
   }
}

module.exports={addCategory,getCategory};