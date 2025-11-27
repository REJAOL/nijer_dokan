const Product = require("../models/Product.model.js")


const add = async (req,res)=>{
    const {name,rating,brand,price,color,quantity,image,category,description} = req.body 
    
    if(!name || !rating || !brand || !price || !color || !quantity || !image || !category || !description){
        res.status(403).json({
            message:"every field is required"
        })
    }

    const product = await Product.create({
        name,
        rating,
        brand,
        price,
        color,
        quantity,
        image,
        description,
        category
    })

    await product.populate('category')

    return res.status(201).json({
        sucess:true,
        message:"product added successfully",
        name:product.name,
        rating:product.rating,
        brand:product.brand,
        price:product.price,
        color:product.color,
        quantity:product.quantity,
        image:product.image,
        description:product.description,
        category:product.category,
       
    })
}

const get = async (req,res)=>{
    const products = await Product.find().populate('category')
    res.json({
        success:true,
        products
    })
}

const update = async(req,res)=>{
    const product = await Product.findOne({
        _id:req.params.id
    })
    

    product.name =req.body.name
    product.rating=req.body.rating
    product.brand=req.body.brand
    product.price=req.body.price
    product.color=req.body.color
    product.quantity=req.body.quantity
    product.image=req.body.image
    product.description=req.body.description
    product.category=req.body.category

    const updatedProduct = await product.save()
    await updatedProduct.populate('category')

    console.log(updatedProduct);

    res.status(200).json({
        success:true,
        message:"product updated successfully",
        product:updatedProduct
    })

}

const remove = async (req,res)=>{
    const product = await Product.findOne({_id:req.params.id})

    await product.deleteOne()

    return res.status(200).json({
        success:true,
        message:"deleted successfully",
        deletdProductByID:req.params.id
    })
}

module.exports = {add,get, update, remove}