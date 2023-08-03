const Product = require("../models/product.model");

const addProduct = async (req,res) =>{

    try{
        const products=[
            {
                title: 'Real me 9 pro plus',
                price: 25000,
                description: 'Best mobile in this range',
                availability: true,
                category:"64ca9dc8ad51e8120c9dbe9a" 
            },
            {
                title: 'Lord of the rings',
                price: 500,
                description: 'Top selling book',
                availability: true,
                category:"64ca9dc8ad51e8120c9dbe9b" 
            },
            {
                title: 'Rice',
                price: 50,
                description: 'wefvrg',
                availability: true,
                category:"64ca9dc8ad51e8120c9dbe9c" 
            }
        ];
        const finalProduct=await Product.insertMany(products);
        res.status(201).send("products has been added");

    }catch(err){
        console.log(err);
        res.status(500).send("Something went wrong!!");
    }
}

const getProduct = async (req,res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.find({ category: categoryId })
          .select('title price description availability')
          .populate('category', 'name');
        res.status(200).send(products);
      } catch (err) {
        res.status(500).send("Something went wrong!!");
      }
};
const getOneProduct = async(req,res) =>{
    try{
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        res.status(200).send(product);
    }catch(err){
        res.status(500).send("Something went wrong!!");
    }
}

module.exports={addProduct,getProduct,getOneProduct};