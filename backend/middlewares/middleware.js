const { verifyToken } = require("../utils/jwtUtlis")

const authMiddleware=async(req,res,next)=>{
    try {
        const authHeader=req.headers.authorization
        if(!authHeader){
            res.json({
                msg:"Missing Token"
            })
        }
        const [,token]=authHeader.split(' ')
        const decoded= verifyToken(token)
        if(decoded){
            // const existingUser=await User.find({
            //     _id:decoded.userId
            // })
            // if(existingUser.length>0){
                req.userId=decoded.userId
                // console.log(req.userId)
                next()
            // }
            // else{
            //     res.json({
            //         msg:"User doesn't exists"
            //     })
            // }
        }
        else{
            res.json({
              msg: "Token verification failed",
            });
          }
        
    } catch (error) {
        console.error("Error in userMiddleware:", error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }

}
module.exports=authMiddleware