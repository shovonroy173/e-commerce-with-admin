import {createSlice} from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product" , 
    initialState:{
        products:[] , 
        isFetching:false , 
        isError : false , 
    } , 
    reducers:{
        // GET ALL
        getProductStart:(state)=>{
            state.isFetching=true ;
            state.isError = true;
        } , 
        getProductSuccess:(state , action)=>{
            state.isFetching=false ;
            state.products = action.payload;
        } ,
        getProductFailure:(state)=>{
            state.isFetching=false ;
            state.isError = true;
        } ,
        // DELETE
        deleteProductStart:(state)=>{
            state.isFetching = true;
            state.isError = false;
        } ,
        deleteProductSuccess:(state , action)=>{
            state.isFetching = false;
            state.products.splice(state.products.findIndex((item)=>(item._id === action.payload)));
        } ,
        deleteProductFailture:(state)=>{
            state.isFetching = false;
            state.isError = true;
        } ,

        // UPDATE
        updateProductStart:(state) =>{
            state.isFetching = true;
            state.isError = false;
        } , 
        updateProductSuccess:(state , action) =>{
            state.isFetching = false;
            state.products[
                state.products.findIndex((item)=>item._id === action.payload)
            ] = action.payload.product;
        } , 
        updateProductFailure:(state) =>{
            state.isFetching = false;
            state.isError = true;
        } , 
        // ADD PRODUCT
        addProductStart:(state) =>{
            state.isFetching = true;
            state.isError = false;
        } , 
        addProductSuccess:(state , action) =>{
            state.isFetching = false;
            state.products.push(action.payload);
        } , 
        addProductFailure:(state) =>{
            state.isFetching = false;
            state.isError = true;
        } , 
    } ,
});

export const { getProductStart,
    getProductSuccess,
    getProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailure,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure,} = productSlice.actions;

export default productSlice.reducer;