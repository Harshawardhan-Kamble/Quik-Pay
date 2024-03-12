const {hash,compare,genSalt}=require("bcrypt")
 const hashedPwd=async(password)=>{
    const salt=await genSalt()
    const hashedPassword=await hash(password,salt)
    return hashedPassword
}
 const matchPassword=async(password,hashPasswordfromDb)=>{
    return await compare(password,hashPasswordfromDb)
}
module.exports={
    hashedPwd,
    matchPassword
}