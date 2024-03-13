const dotenv=require("dotenv")
dotenv.config();
const mongoose =require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30
    }

})
const User=mongoose.model('User',userSchema)
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
        },
    balance:{
        type:Number,
        required:true,
    },
})
const Account=mongoose.model('Account',accountSchema)
module.exports={
    User,
    Account
};