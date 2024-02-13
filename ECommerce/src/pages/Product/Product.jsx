import React, { useEffect, useState } from 'react'
import '../Product/Product.css'
import { useLocation } from 'react-router-dom'
import { MdOutlineStar } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/ReducerSlice';
import { ToastContainer, toast } from "react-toastify";

function Product() {

  const location = useLocation();
  const [product, setProduct] = useState("");
  let [baseQty, setbaseQty] = useState(1);
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log(location.state.item.product)
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
          <div style={{ display: 'flex', gap: '4px' }}>
            <div className='quantitybox'>
              <p style={{ fontSize: '14px' }}>Quantity</p>
              <div className='buttons'>
                <button onClick={() => setbaseQty(baseQty === 1 ? baseQty = 1 : baseQty - 1)}>-</button>
                <span>{baseQty}</span>
                <button onClick={() => setbaseQty(baseQty + 1)}>+</button>
              </div>
            </div>
            <button onClick={() => dispatch(addToCart({
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
              quantity: baseQty,
              description: product.description,
            })
              ) & toast.success(`${product.title} is added`)
            } className='addtocartbutton'>Add to cart</button>
          </div>
          <p>Category:{product.category}</p>
        </div>
      </div>
      <ToastContainer
        position='top-left'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        
      />
    </div>

  )
}

export default Product