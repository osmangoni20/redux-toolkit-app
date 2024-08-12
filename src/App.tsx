import { SetStateAction, useState } from "react"
import ProductForm from "./Features/products/ProductForm"
import ProductView from "./Features/products/ProductView"


function App() {
const [productEdit, setProductEdit]=useState(null)
const HandleEdit=(product)=>{
  setProductEdit(product)
}
  return (
    <>
    <ProductForm productEdit={productEdit} setProductEdit={setProductEdit}/>
    <ProductView onHandleEdit={HandleEdit}/>

    </>
  )
}

export default App
