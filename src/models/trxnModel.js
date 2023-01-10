const mongoose = require("mongoose");
const userModel = require("./userModel");

const TrxnModel = mongoose.Schema({
    trxnName:{
        type:String,
        required:true
    },
    trxnType:{
        type:String,
        required:true,
        enum:['Entertainment','Food','Home','Work']
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:userModel,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },

}, {
    timestamps:true
});
module.exports = mongoose.model("trxn-model", TrxnModel);