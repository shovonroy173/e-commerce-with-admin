import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String  , required : true} , 
    img : { type : String , required : true} , 
    categories : { type: Array} , 
    size : {type : Array} , 
    color : { type : Array} , 
    inStock :{type:Boolean , default:true} , 
    price : { type : Number , required : true}
} , 
{
    timestamps:true
});

export default model("Product" , ProductSchema);