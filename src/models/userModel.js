const mongoose = require("mongoose")

const UserModel = mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        unique:true
    },
    userPassword:{
        type:String,
        required:true
    },
    monthlyBudget:{
        type:Number,
        default:0
    },
    monthlyExpenditure:{
        type:Number,
        default:0
    }

},{
    timestamps:true
})
module.exports = mongoose.model("user-model", UserModel);