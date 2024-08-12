import React, {useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct,updateProduct } from "../products/ProductSlice.js";
import { nanoid } from 'nanoid';
const ProductForm = ({productEdit,setProductEdit}) => {
    const dispatch=useDispatch()
    const[product,setProduct]=useState({
        Name:productEdit?.Name||"",
        Category:productEdit?.Category||"",
        Price:productEdit?.Price||0,
        Stock:productEdit?.Stock||0,
        Rating:productEdit?.Rating||0,
        ReleaseDate:productEdit?.ReleaseDate||'',
        Description:productEdit?.Description||""
    })
    useEffect(() => {
        setProduct(productEdit)
        }, [productEdit])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleInputField=(e:any)=>{
    setProduct({
        ...product,
        [e.target.name]:e.target.value
    })
}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleSubmit=(e:any)=>{
        e.preventDefault()
        if(productEdit){
            dispatch(updateProduct(product))
            setProductEdit(null)
        }
        else{
            dispatch(createProduct({...product,id:nanoid()}))
        }
      
        setProduct({
            Name:"",
            Category:"",
            Price:0,
            Stock:0,
            Rating:0,
            ReleaseDate:'',
            Description:""
        })
    }
    return (
        <div className='flex justify-center'>
            

            <form className='p-5 my-4 border-2 border-gray-400 text-xl'>
                <div className='m-2'>
                    <label id='name' className='block font-bold text-xl'>Name</label>
                    <input
                    className='border-2 border-gray-300 rounded-md w-[350px]'
                    type='text'
                    id='name'
                    name='Name'
                    onChange={(e)=>HandleInputField(e)}

                    value={product?.Name}
                    />
                </div>
                <div className='m-2'>
                <label id='category' className='block font-bold text-xl'>Category</label>
                    <input
                    className='border-2 border-gray-300 rounded-md w-[350px]'
                    type='text'
                    id='category'
                    name='Category'
                    onChange={(e)=>HandleInputField(e)}
                    value={product?.Category}
                    />
                </div>
                <div className='m-2'>
                <label id='price' className='block font-bold text-xl'>Price</label>

                    <input
                    className='border-2 border-gray-300 rounded-md w-[350px]'
                    type='number'
                    name='Price'
                    id='price'
                    onChange={(e)=>HandleInputField(e)}

                    value={product?.Price}
                    />
                </div>
                <div className='m-2'>
                <label id='stock' className='block font-bold text-xl'>Stock</label>

                    <input
                    className='border-2 border-gray-300 rounded-md w-[350px]'
                    type='number'
                    id="stock"
                    name='Stock'
                    onChange={(e)=>HandleInputField(e)}

                    value={product?.Stock}
                    />
                </div>
                <div className='m-2'>
                <label id='description' className='block font-bold text-xl'>Description</label>

                    <textarea
                    className='border-2 border-gray-300 rounded-md w-[350px]'
                    onChange={(e)=>HandleInputField(e)}
                    name='Description'
                    id='description'
                    value={product?.Description}
                    />
                </div>
                <div className='m-2 flex justify-center'>
                  <button className='btn p-3 rounded-md bg-purple-500 text-white' type='submit'
                   onClick={(e)=>HandleSubmit(e)}> {productEdit?"Update Product":"Create Product"}</button>
                </div>

            </form>
        </div>
    );
};

export default ProductForm;