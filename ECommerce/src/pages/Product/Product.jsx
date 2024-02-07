import React, { useEffect, useState } from 'react'
import '../Product/Product.css'
import { useLocation } from 'react-router-dom'
function Product() {
  const location=useLocation();
  const [product,setProduct] = useState("");
  useEffect(()=>{
     setProduct(location.state.item.product)
  },[])
  return (
    <div className='product'>
      <div className='productimage'>
          <img src={product.image} alt='productImage'/>
          <p>${product.price}</p>
          <button>Add to cart</button>
      </div>
      <div className='details'>
        details
      </div>
    </div>
  )
}

export default Product