const express = require("express");
const router = express.Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require("stripe")(KEY);

router.post("/payment" , (req , res)=>{
    console.log("LINR AT 7" , req);
    stripe.charges.create(
        {
            source:req.body.tokenId , 
            amount:req.body.amount , 
            currency:"usd" , 
        } , 
    (stripeErr , stripeRes)=>{
        if(stripeErr) {
            console.log("LINR AT 16" ,stripeErr);
            res.status(500).json(stripeErr);
        }
        else{
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;