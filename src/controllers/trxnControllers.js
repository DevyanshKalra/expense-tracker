const trxnModel = require("../models/trxnModel")
const userModel = require("../models/userModel")

exports.getTrxn = async(req,res)=>{
    try{
        const userEmail=req.query.email;
        const userToFind= await userModel.findOne({userEmail})
        if(!userToFind){
            return res.status(404).json({status:false , msg: "cannot find user with that email!" });
        }
        const trxns = await trxnModel.find({userId:userToFind._id})
        return res.status(200).json({status:true ,trxns, msg: "Transactions found" });
    }
    catch(err){
        console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
    }
}

exports.postTrxn = async (req,res)=>{
    try{
        const {userEmail} = req.body;
        const data=req.body;
        let userToFind= await userModel.findOne({userEmail})

        //pushing userId to json object
        data["userId"] = userToFind._id

        //updating user's budget
        let newBudget = parseInt(userToFind.monthlyBudget) - data.amount
        let newExpenditure = parseInt(userToFind.monthlyExpenditure) + data.amount
        if(newBudget>=0){
            userToFind = await userModel.findOneAndUpdate({userEmail}, {monthlyBudget:newBudget,monthlyExpenditure:newExpenditure})
            const trxn= await trxnModel.create(data);
            res.status(200).json({status:true,trxn,newBudget,msg:"Transaction Created"})
        }
        else{
            res.status(404).json({status:false,msg:"Out of Budget"})
        }
        
    }
    catch(err){
        console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
    }
}

exports.updateTrxn = async (req,res)=>{
    try{
        const {trxnId} = req.body;
        const data=req.body;
        let trxnToFind = await trxnModel.findById(trxnId)
        let userToFind= await userModel.findById(trxnToFind.userId)
        
        //updating user's budget

        let newBudget = parseInt(userToFind.monthlyBudget) + (trxnToFind.amount-data.amount)
        let newExpenditure = parseInt(userToFind.monthlyExpenditure) - (trxnToFind.amount-data.amount)
        if(newBudget>=0){
            userToFind = await userModel.findByIdAndUpdate(userToFind._id, {monthlyBudget:newBudget,monthlyExpenditure:newExpenditure})
            const trxn= await trxnModel.findByIdAndUpdate(trxnId,{amount:data.amount})
            res.status(200).json({status:true,trxn,msg:"Transaction updated"})
        }
        else{
            res.status(404).json({status:false,msg:"Out of Budget"})
        }
    }
    catch(err){
        console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
    }
}

exports.deleteTrxn = async (req,res)=>{
    try{
        const {trxnId} = req.body;
        console.log(trxnId)
        let trxnToFind = await trxnModel.findById(trxnId);
        if(!trxnToFind){
            res.status(404).json({status:false,msg:"Trxn dosen't exist"})
        }
        console.log(trxnToFind);
        let userToFind= await userModel.findById(trxnToFind.userId)

        let newBudget = parseInt(userToFind.monthlyBudget) + (trxnToFind.amount)
        let newExpenditure = parseInt(userToFind.monthlyExpenditure) - trxnToFind.amount
        userToFind = await userModel.findByIdAndUpdate(userToFind._id, {monthlyBudget:newBudget,monthlyExpenditure:newExpenditure})
        const trxn= await trxnModel.findByIdAndDelete(trxnId)
        res.status(200).json({status:true,trxn,msg:"Transaction Deleted"})
         
    }
    catch(err){
        console.log(err);
		res.status(500).json({msg: "Internal Server Error"});
    }
}
