const {sign,verify}=require("jsonwebtoken")
const secretpassword=process.env.MYSECRETPASSWORD
 const generateToken=(data)=>{
    const token =sign(data,secretpassword)
    return token
}
 const verifyToken=(token)=>{
return verify(token,secretpassword)
}

module.exports={
    generateToken,
    verifyToken
}