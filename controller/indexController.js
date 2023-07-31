const userSchema = require('../schemas/userSchema');
var expenseSchema = require('../schemas/expenseSchema');
const { sendToken } = require('../utils/Auth');

exports.Slashpage = function(req, res, next) {
    res.json("this is / page");
  }

exports.CreateUser = async function(req,res,next){
    const {username,password,email}= req.body;
    const user = await userSchema.create({
        email,
        username,
        password
    })
    sendToken(user,201,res)
}

exports.LoginUser = async function(req,res,next){
    const {email,password}= req.body;

    const user = await userSchema.findOne({email}).select("+password")
    if(!user){
        res.json({message:"user not found !"})
    }
     
    const matchPassword = user.comparePassword(password);

    if(!matchPassword) res.json({message:"Invalid Credentials !"})

    sendToken(user,201,res)


}

exports.logOutUser = async (req,res,next) => {
    res.clearCookie("token")
    res.json({message:"logout succesfully!"})
}

exports.CreateExpense = async function(req,res,next){
    const {expenseName,category,expenseDes,amount,dateOfexpense } = req.body
  
   
    const user =  req.user;
    
   var expense = await expenseSchema.create({
      expenseName,
      amount,
      expenseDes,
      category,
      dateOfexpense,
      user:user._id,
    })

    
    user.expense.push(expense._id)
     var Euser = await user.save()
     
    res.json({success:true,data:expense})
  }

exports.userExpenses = async function(req,res,next){
    try {
    
      let User = req.user
       let populateUser =  await User.populate("expense");
        // let Post = await User.post.populate()
        
        res.status(201).json(populateUser.expense)
    
    } catch (error) {
      res.json(error.message)
    }
  }

exports.allExpenses = async function(req,res,next){
    try {
    var expense = await expenseSchema.find().populate('user')
    
    res.json({expense})
    } catch (error) {
      res.json(error.message)
    }
  }

exports.deleteExpense = async function(req,res,next){
    try {
      var user= req.user
      var user1 = await userSchema.findOne({_id:user._id})
      
      let expense =  req.params.plc
      var index =user1.expense.indexOf(expense)
      user1.expense.splice(index,1)
      var deleteExpense = await expenseSchema.findOneAndDelete({_id:expense})
      await user1.save()
      res.json({deleteExpense,expense})
    } catch (error) {
      res.json(error.message)
    }
  }

exports.editExpense = async function(req,res,next){
    try {
      let expenseid =  req.params.plc
      var updatedExpense = await expenseSchema.findOneAndUpdate({_id:expenseid},{
      expenseName:req.body.expenseName,
      amount:req.body.amount,
      expenseDes:req.body.expenseDes,
      dateOfexpense:req.body.dateOfexpense,
      category:req.body.category
      })
  
      res.json({updatedExpense})
    } catch (error) {
      res.json(error.message)
    }
  }

exports.homePage = async function(req, res, next) {
  
    const user =  req.user;
  
    // console.log(user)
  
    res.send("this is home page");
  }