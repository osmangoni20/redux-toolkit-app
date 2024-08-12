import { configureStore } from "@reduxjs/toolkit";
import productReducer  from "../Features/products/ProductSlice";


 const store =configureStore({
    reducer:{
        productR:productReducer
    }
})

export default store;