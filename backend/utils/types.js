const zod=require("zod")
const signupData=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string(),
    email:zod.string().email()
})
const signinData=zod.object({
    password:zod.string(),
    email:zod.string().email()
})
module.exports={
    signupData,
    signinData
}