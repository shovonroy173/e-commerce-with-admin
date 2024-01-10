const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

// CREATE CART
router.post("/" , verifyToken , async(req , res)=>{
    
    try {
        const cart = new Cart(req.body);
        res.status(200).json(cart);
    } catch (error) {
        res.status(200).json(error);
    }
});

// UPDATE
router.put("/:id" , verifyTokenAndAuthorization , async(req , res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id , {
                $set:req.body , 
            } , 
            {new : true} , 
        )
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE
router.delete("/:id"  , verifyTokenAndAuthorization , async(req , res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id)
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET USER CART
router.get("/find/:userId" , verifyTokenAndAuthorization , async(req , res)=>{
    try {
        const cart = await Cart.findOne({userId : req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL
router.get("/" , verifyTokenAndAdmin , async(req , res)=>{
    try {
        const allCart = await Cart.find();
        res.status(200).json(allCart);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;