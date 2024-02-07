import React, { useEffect, useState } from 'react'
import '../Product/Product.css'
import { useLocation } from 'react-router-dom'
import { MdOutlineStar } from 'react-icons/md';

function Product() {
  const location = useLocation();
  const [product, setProduct] = useState("");
  useEffect(() => {
    console.log(location.state.item.product)
    setProduct(location.state.item.product)
  }, [])
  return (
    <div>
      <div className='product'>
        <div style={{ width: '30%', position: 'relative' }}>
          <img className='productimage' src={product.image} alt='productimg' />
        </div>
        <div className='details'>
          <div>
            <h2>{product.title}</h2>
            <div>
              <p className='price'>${product.price}</p>
            </div>
          </div>
          <div className='rating'>
            <div style={{ color: 'tomato' }}>
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
              <MdOutlineStar />
            </div>
            <p>(1 customer review)</p>
          </div>
          <p>{product.description}</p>
          <div style={{display:'flex', gap:'4px'}}>
            <div className='quantitybox'>
              <p style={{ fontSize: '14px' }}>Quantity</p>
              <div className='buttons'>
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </div>
            <button className='addtocartbutton'>Add to cart</button>
          </div>
          <p>Category:{product.category}</p>
        </div>
      </div>

    </div>

  )
}

export default Product