const { User } = require("../db/db")
const { signupData, signinData, updateData } = require("../utils/types")
const { hashedPwd, matchPassword } = require("../utils/pwdUtils")

const {Router} =require("express")
const { generateToken } = require("../utils/jwtUtlis")
const authMiddleware = require("../middlewares/middleware")
const router=Router()
router.post("/signup",async(req,res)=>{
    const createPayload=req.body
    const parsePayload=signupData.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg:"You have entered wrong input"
        })
        return
    }
    const {firstName,lastName,password,email}=createPayload
    const existingUser=User.find({
        email
    })
    if(existingUser.length>0){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
    else{
        const user=await User.create({
            firstName,
            lastName,
            email,
            password:await hashedPwd(password)
        })
        const userId=user._id
        const token=generateToken({userId})
        res.status(200).json({
            message: "User created successfully",
            token
        })
    }
})
router.post("/signin",async(req,res)=>{
    const createPayload=req.body
    const parsePayload=signinData.safeParse(createPayload)
    if(!parsePayload.success){
        res.status(411).json({
            msg:"You have entered wrong input"
        })
    }
    const {email,password}=createPayload
    const existingUser=await User.findOne({
        email
    })
    if(!existingUser){
        res.status(411).json({
            msg:"User doesn't exists"
        })
        return
    }

    if(existingUser && await matchPassword(password,existingUser.password) ){
        const userId=existingUser._id
        const token =generateToken({
            userId
        })
        res.status(200).json({
            token
        })
    }
    else {
        res.status(411).json({
            msg:"Invalid Password"
        })
    }
})
router.put("/",authMiddleware,async(req,res)=>{
    const parsePayload=updateData.safeParse(req.body)
    if(!parsePayload.success){
        res.status(411).json({
            msg:"Something went wrong while updating"
        })
    }
    if(parsePayload.data.password){
        const updatedPassword=await hashedPwd(parsePayload.data.password)
        parsePayload.data.password=updatedPassword
    }
    const existingUser=await User.findOne({
        _id:req.userId
    }) 

    if(existingUser){
        await User.updateOne(
            { _id: req.userId },
            parsePayload.data
          );
        res.json({
            msg:"User detail updated Successfully"
        })
    }
})
module.exports=router