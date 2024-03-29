const Product = require("../models/Product");
const express = require("express");
const { verifyTokenAndAdmin } = require("./verifyToken");
const router = express.Router();

// Create a Product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update
router.put("/:id", verifyTokenAndAdmin ,  async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete
router.delete("/:id" , verifyTokenAndAdmin , async(req , res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});
 
// GET SINGLE PRODUCT
router.get("/find/:id" , async(req , res)=>{
    try {
        const singleProduct = await Product.findById(req.params.id);
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL PRODUCTS
router.get("/" , async(req , res)=>{
  // try {
  //   const products = await Product.find();
  //   res.status(200).json(products);

  // } catch (error) {
  //   res.status(500).json(error);
  // }
    const qNew = req.query.new;
    const qCategory = req.query.category;
    // console.log(qCategory);
    try {
        let products;
        if(qNew){
             products = await Product.find().sort({createdAt:-1}).limit(1);
            res.status(200).json(products);
        }else if(qCategory){
            products = await Product.find({
                categories:{
                    $in:[qCategory]
                }
            })
        }
        else{
            products = await Product.find();
        }
        res.status(200).json(products);
        // console.log(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

// router.get("/", async (req, res) => {
//   const qNew = req.query.new;
//   const qCategory = req.query.category;
//   try {
//     let products;

//     if (qNew) {
//       products = await Product.find().sort({ createdAt: -1 }).limit(1);
//     } else if (qCategory) {
//       products = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       });
//     } else {
//       products = await Product.find();
//     }

//     res.status(200).json(products);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
