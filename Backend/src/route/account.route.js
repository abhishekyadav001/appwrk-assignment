const express = require("express");
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

            }
        }
    } catch (error) {
        
    }
})

module.exports = { router };
