import React from 'react'
import './CartItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineClose } from 'react-icons/md'
import { decrementQuantity, deleteItem, incrementQuantity, resetCart } from '../../redux/ReducerSlice'
import { toast } from 'react-toastify'
import { Link } from "react-router-dom"
const CartItem = () => {
  const productData = useSelector((state) => state.bazaar.productData);
  const dispatch = useDispatch();
  return (
    <div className='CartItem'>
      <div className='CartItem1'>
        <h2 className='heading1'>Shopping Cart</h2>
      </div>
      {productData.length === 0 ? (
        <>
        <p>Your cart is empty.</p>
        <Link to="/"><button className='resetbtn'>Go to shopping</button></Link>
        </>
      ) : (
        <div>
          <div>
        {
          productData.map((item) => {
            return (
              <div key={item.id} className='box1'>
                <div className='box2'>
                  <MdOutlineClose onClick={() => dispatch(deleteItem(item.id))
                    & toast.error(`${item.title} is removed`)
                  } className='icon' />
                  <img className='image' src={item.image} alt='image' />
                </div>
                <h2 style={{ width: '52%' }}>{item.title}</h2>
                <p style={{ width: '10%' }}>${item.price}</p>
                <div className='quantitybox'>
                  <p style={{ fontSize: '14px' }}>Quantity</p>
                  <div className='buttons'>
                    <button onClick={() => dispatch(decrementQuantity({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      quantity: 1,
                      description: item.description
                    }))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQuantity({
                      id: item.id,
                      title: item.title,
                      image: item.image,
                      price: item.price,
                      quantity: 1,
                      description: item.description
                    }))}>+</button>
                  </div>
                </div>
                <p style={{ width: '14%' }}>${item.quantity * item.price}</p>
              </div>
            )
          })
        }
      </div>
      <button onClick={() => dispatch(resetCart()) & toast.error(`Cart is Empty`)} className='resetbtn'>Reset Cart</button>
      <Link to="/"><button className='resetbtn'>Go to shopping</button></Link>
        </div>
      )
      }
      
    </div>
  )
}

export default CartItem