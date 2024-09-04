const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const transactionModel= require("../model/account.model");

router.post("/transaction", async(req,res)=>{
    const {type, amount}= req.body;
    if(!["credit","debit"].includes(type)){
        return res.send({error:"Invalid transaction type"}).status(400);
    }
    const transaction = transactionModel.create({type,amount});
    try {
        // transaction logic;
        const session= await mongoose.startSession();
        session.startTransaction();
        if(type==='debit'){
            const totalBalance = await transactionModel.aggregate([
                {
                    $group:{
                        id:null,
                        total:{$sum:{$cond:[{$eq:['$type','credit']},'$amount',{$mulitply:['$amount',-1]}]}}
                    }
                }
            ]);
            
            const balance = totalBalance.length ? totalBalance[0].total:0;
            
            if(balance<amount){
                await session.abortTransaction();
                session.endSession();
                return res.status(400).send({error:"Insufficient balance for debit"});
            }
            await transaction.save({session});
            await session.commitTransaction();
            session.endSession();  
        }
        res.status(200).send({message:"transaction successfull has completed"})
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
});


module.exports = { router };
