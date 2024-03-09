const mongoose =require("mongoose")
mongoose.connect(process.env.DATABASE_URL)
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
        maxLength:20
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
module.exports={
    User
};