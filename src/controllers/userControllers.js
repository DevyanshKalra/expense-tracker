const userModel = require("../models/userModel")
const bcrypt = require('bcrypt');
//Register an account
exports.registerUser = async (req,res) =>{
    try{
        const data = req.body;
        console.log(data)
        const isPresent = await userModel.findOne({userEmail:data.userEmail});
        if(isPresent){
            return res.status(404).json({status:false,msg:"User Already Exists"})
        }
        data.userPassword = await bcrypt.hash(data.userPassword,10)
        const users = await userModel.create(data)
        res.status(200).json({status:true,users,message:"User registered"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error",status:false})
    }
}

//login to an account
exports.loginUser = async (req,res) => {
    try{
        const {userEmail, userPassword}=req.body;
           //find user by email
        let userToFind= await userModel.findOne({userEmail})
        if(!userToFind){
            res.status(404).json({status:false,msg:"Cannot find user"})
        }
        else{
            let isValid = await bcrypt.compare(userPassword,userToFind.userPassword)
            if(isValid){
                res.status(200).json({status:true,msg:"Logged in successfully"})
            }
            else{
                res.status(404).json({status:false,msg:"Password is incorrect"})
            }
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error",status:false})
    }
}

exports.getBudget = async (req,res) =>{
    try{
        const userEmail=req.query.email;
        console.log(userEmail)
        const userToFind= await userModel.findOne({userEmail})
        if(!userToFind){
            return res.status(404).json({status:false , msg: "cannot find user with that email!" });
        }
        else{
            return res.status(200).json({status:true,budget:userToFind.monthlyBudget})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error",status:false})
    }
}
exports.postBudget = async (req,res) =>{
    try{
        const {userEmail , newBudget}=req.body;
           //find user by email
        let userToFind= await userModel.findOne({userEmail})
        if(!userToFind){
            return res.status(404).json({status:false , msg: "cannot find user with that email!" });
        }
        else{
            //updating userBudget
            userToFind = await userModel.findOneAndUpdate({userEmail},{monthlyBudget:newBudget})
            return res.status(200).json({status:true,msg:"Budget Updated"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal server error",status:false})
    }
}