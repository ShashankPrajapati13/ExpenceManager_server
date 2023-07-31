exports.sendToken = async (user,statusCode,res)=>{
    const token = user.generateToken();
    // console.log(token)

    const cookieOption = {
        expires : new Date(Date.now()+process.env.COOKIE_EXPIRE *60*60*1000),
        httpOnly:true
    }

    res.status(statusCode).cookie("token",token,cookieOption).json({message:"Logged in succesful",user,token})
}