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
const updateData=zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional(),
})
module.exports={
    signupData,
    signinData,
    updateData
}