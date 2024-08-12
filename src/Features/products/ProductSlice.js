import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState={
    products:[],
    isLoading:false,
    error:null||""
}
const BASE_URL='http://localhost:3000/products'
export const fetchProducts=createAsyncThunk('products/fetchProducts', async()=>{
    const res=await axios.get(BASE_URL)
    return res.data;
})
export const createProduct=createAsyncThunk('products/createProduct', async(product)=>{
    const res=await axios.post(`${BASE_URL}`,product)
    console.log(res.data)
    return res.data
})
export const deleteProducts=createAsyncThunk('products/deleteProducts', async(id)=>{
    console.log(id)
    await axios.delete(`${BASE_URL}/${id}`)
    return id;
})
export const updateProduct=createAsyncThunk('products/updateProduct', async(product)=>{
 
   const res= await axios.put(`${BASE_URL}/${product.id}`,product)
    return res.data
})

export const productSlice=createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{builder
        .addCase(fetchProducts.pending,(state)=>{
            state.isLoading=true
            state.error=null||''
        })
       .addCase(fetchProducts.fulfilled,(state, action)=>{
            state.isLoading=false
            state.products=action.payload
            state.error=null||''
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.isLoading=false
            state.products=[]
            state.error="Something Error"||action.error.message
        })
       .addCase(deleteProducts.fulfilled,(state, action)=>{
            console.log(action.payload)
            state.products= state.products.filter(product=>product.id!==action.payload)
            console.log(state.products)
        })
        .addCase(deleteProducts.rejected,(state, action)=>{
            state.error=action.error.message
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.products.push(action.payload)
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            const productIndex=state.products.findIndex(product=>product.id===action.payload.id)
            state.products[productIndex]=action.payload
        })
    }
    
})

export default productSlice.reducer