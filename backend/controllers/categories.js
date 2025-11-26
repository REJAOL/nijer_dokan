const Category = require('../models/Category.model.js')


const add = async (req, res) => {
    const { title, description } = req.body;

    // 1. Check if required fields are missing
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "Title and description are required"
        });
    }

    // 2. Check if category already exists
    const isExisting = await Category.findOne({ title });
    if (isExisting) {
        return res.status(403).json({
            success: false,
            message: "This category already exists"
        });
    }

    // 3. Create new category
    const category = await Category.create({
        title,
        description
    });

    // 4. Send success response
    return res.status(201).json({
        success: true,
        message: "Category added successfully",
        category: {
            id: category._id,
            title: category.title,
            description: category.description
        }
    });
};

const get = async(req,res) =>{
    const categories= await Category.find()
    res.status(200).json({
        success:true,
        categories
    })
}

const update = async(req,res)=>{
    const category = await Category.findOne({_id:req.params.id})
    category.title = req.body.title
    category.description = req.body.description


    const updatedCategory = await category.save()


    res.status(200).json({
        success:true,
        message:"category updated successfully",
        category:updatedCategory
    })
}

const remove = async(req,res)=>{
    const category = await Category.findOne({_id:req.params.id})

    await category.deleteOne()
    res.status(200).json({
        success:true,
        message:"Category deleted Successfully",
        deletedCategoryById: req.params.id
    })
}

module.exports = {add,get,update,remove}