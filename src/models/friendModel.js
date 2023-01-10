const mongoose = require("mongoose");
const splitModel = require("./splitModel");

const FriendModel = mongoose.Schema({
    userName:{
        type:mongoose.Schema.Types.ObjectId,
        ref:splitModel,
        required:true,
        unique:true
    },
    amount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:splitModel,
        deafult:0,
    }
    

},{
    timestamps:true
})
module.exports = mongoose.model("user-model", FriendModel);