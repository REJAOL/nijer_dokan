const bcrypt = require('bcryptjs')
const User = require('../models/User.model.js')

const register = async (req,res)=>{
    const {name,email,password,phone,address,role} = req.body 
    if(!name || !email || !password || !phone || !address){
        return res.status(500).json({
            message:"every field is needed"
        }
        )
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const user = await User.create({
        name,
        email,
        password:hashPassword,
        phone,
        address,
        role
    })

    return res.status(201).json({
        message:"user created successfully",
        success:true,
        user:{
            id:user._id,
            email,
            phone,
            address,
            role
        }
    })
}

const login = async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    const ismatch = await bcrypt.compare(password, user.password)
    if(ismatch){
        return res.status(200).json({
            message:"login successful",
            user:{
                id:user._id,
                email:user.email
            }
        })
    }

}

module.exports = {register, login}