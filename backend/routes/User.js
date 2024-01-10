const express = require("express");
const router = express.Router();
const CryptoJS = require("crypto-js");
const User = require("../models/User");
const { verifyTokenAndAuthorization , verifyTokenAndAdmin } = require("./verifyToken");

// UPDATE
router.put("/:id" , verifyTokenAndAuthorization ,  async(req , res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password , process.env.PASS_SEC).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id , 
            {
                $set:req.body
            } , 
            {
                new:true
            }
        );

        const {password , ...others} = updatedUser;

        res.status(200).json(others);
        
    } catch (error) {
        res.status(500).json(error)
    };
});

// DELETE
router.delete("/:id" , verifyTokenAndAuthorization ,  async(req , res )=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted!");
    }catch(err){
        res.status(500).json(err)
    }
});

// GET USER
router.get("/find/:id" , verifyTokenAndAdmin , async(req , res)=>{
    try {
        const singleUser = await User.findById(req.params.id);
        const {password , ...others} = singleUser;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(err)
    };
});

// GET ALL USER
router.get("/" , verifyTokenAndAdmin , async(req , res)=>{
    const query = req.query.new;
    try {
        const allUser = query ? await User.find().sort({_id:-1}).limit(5): await User.find();
        res.status(200).json(allUser);
    } catch (error) {
        res.status(500).json(error);
    }
});
 
// router.get("/stats" , verifyTokenAndAdmin , async(req , res)=>{
//     const date = new Date();
//     const lastYear = new Date(data.setFullYear(date.setFullYear() - 1));

//     try {
//         const userStats = await User.aggregate([
//             {$match:{createdAt : {$gte:lastYear}} } , 
//                 {$project:{
//                     month: {$month:"$createdAt"}
//                 }} , 
//                 {$group:{
//                     _id:"$month" , 
//                     total:{$sum:1}
//                 }}
            
//         ]);
//         res.status(200).json(userStats);
//     } catch (error) {
//         res.status(500).json(err);
//     }
// });

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;