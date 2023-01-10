const mongoose = require("mongoose");
const trxnModel = require("./trxnModel");
const userModel = require("./userModel");

const SplitModel = mongoose.Schema({
    trxnId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:trxnModel,
        required:true
    },
    userName:{
        type:String,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        default:false
    }

}, {
    timestamps:true
});
module.exports = mongoose.model("split-model", SplitModel);