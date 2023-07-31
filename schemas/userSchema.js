var mongoose = require("mongoose")
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const validator = require('validator')


mongoose.connect(process.env.MONGODB_URL)



var userSchema = mongoose.Schema({
  email:{
    type : String,
    required:[true,"email required"],
    validate: [validator.isEmail,"InValid Email"],
    unique:true
},
username: {
    type: String,
    required: [true,"username required"],
    unique:true
},
password:{
    type: String,
    required:[true,"password required"],
    // minLength:[4,"enter minimum 4 length password"],
    select: false

},
  expense:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'expense'
  }]
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) next()
    else this.password = await bcrypt.hash(this.password,12);
})

userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}



module.exports = mongoose.model('user',userSchema)