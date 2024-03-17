const { Router } = require("express");
const { Account } = require("../db/db");
const authMiddleware = require("../middlewares/middleware");
const router = Router();
router.get("/balance",authMiddleware,async(req,res)=>{
    const userId=req.userId
   const userBalance= await Account.findOne({
       userId
    })
    console.log(userBalance)
    res.json({
        balance:userBalance.balance
    })
})
module.exports = router;
