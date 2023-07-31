var mongoose = require("mongoose")

var expenseSchema = mongoose.Schema({
    expenseName:String,
    dateOfexpense:Date,
    amount:Number,
    expenseDes:String,
    category:String,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
  },
  {
    timestamps:true,
  })
  
  
  module.exports = mongoose.model('expense',expenseSchema)