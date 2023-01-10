const trxnModel = require("../models/trxnModel")
const userModel = require("../models/userModel")
const splitModel = require("../models/splitModel")

exports.getSplit = async (req,res) => {
    try{
        const trxnId = req.query.trxnId;
        let trxnToFind = await trxnModel.find({trxnId});
        if(!trxnToFind){
            return res.status(404).json({status:false, msg:"Transaction dosen't exist"})
        }
        let splitToFind = await splitModel.find({trxnId});
        if(!splitToFind || splitToFind.length===0){
           return res.status(404).json({status:false, msg:"No splits found for this transaction"})
        }
        res.status(200).json({status:true,numberOfSplits:splitToFind.length,msg:"Transaction split(s) found"})

    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false ,msg: "Internal Server Error"});
        
    }

}

exports.postSplit = async (req,res) => {
    try{
        const data=req.body;
        let trxnToFind = await trxnModel.findOne({trxnId:data.trxnId});
        let userToFind = await userModel.findOne(trxnToFind.userId)  
        if(!trxnToFind){
            return res.status(404).json({status:false, msg:"Transaction dosen't exist"})
        }
        let split,oldSplit;

        const isPresent = await splitModel.findOne({trxnId:data.trxnId},{userName:data.userName});
        if (isPresent){
            // console.log("data in if statement"+JSON.stringify(data))
            split = await splitModel.findOneAndUpdate({trxnId:data.trxnId, userName:data.userName},{amount:data.amount});
            oldSplit = split.amount;
            // console.log("split updated")
        }
        else{
            // console.log("data in else statement"+JSON.stringify(data))
            split = await splitModel.create(data);
            oldSplit=0;
            // console.log("split created")
        }   

        //updating user's budget and expenditure
        let newBudget = parseInt(userToFind.monthlyBudget + (data.amount - oldSplit ))
        console.log("newBudget "+newBudget)
        let newExpenditure = parseInt(userToFind.monthlyExpenditure - (data.amount - oldSplit ))
        
        if(newBudget>=0){
            userToFind = await userModel.findByIdAndUpdate(userToFind._id, {monthlyBudget:newBudget,monthlyExpenditure:newExpenditure})
            // const trxn= await trxnModel.findByIdAndUpdate(trxnId,{amount:data.amount})
            res.status(200).json({status:true,split,msg:"Transaction split created"})
        }
        else{
            res.status(404).json({status:false,msg:"Out of Budget"})
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false ,msg: "Internal Server Error"});
        
    }

}



exports.deleteSplit = async (req,res) => {
    try{
        const data=req.body;
        let trxnToFind = await trxnModel.find({trxnId:data.trxnId});
        if(!trxnToFind){
            return res.status(404).json({status:false, msg:"Transaction dosen't exist"})
        }

        let splitToDelete = await splitModel.findOneAndDelete({trxnId:trxnToFind.id},{userName});
        if(splitToDelete){
            res.status(200).json({status:true,splitToDelete, msg:"split deleted"})
        }
        else{
            res.status(404).json({status:false,splitToDelete, msg:"split dosen't exist or used wrong username"})
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false ,msg: "Internal Server Error"});
        
    }
}

exports.updateIsPaid = async(req,res) => {
    try{
        const data=req.body;
        let trxnToFind = await trxnModel.find({trxnId:data.trxnId});
        if(!trxnToFind){
            return res.status(404).json({status:false, msg:"Transaction dosen't exist"})
        }

        let splitToUpdate = await splitModel.findOneAndUpdate({trxnId:trxnToFind.id},{userName},{isPaid:!isPaid});
        if(splitToUpdate){
            res.status(200).json({status:true,splitToUpdate, msg:"split updated"})
        }
        else{
            res.status(404).json({status:false,splitToUpdate, msg:"split dosen't exist or used wrong username"})
        }
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({status:false ,msg: "Internal Server Error"});
        
    }
}