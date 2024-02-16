import React from 'react'
import CartItem from './CartItem'
import './Cart.css'
import { ToastContainer } from 'react-toastify'
function Cart() {
  
  return (
    <div>
      <h1>Cart</h1>
      <div className='items'>
        <CartItem/>
        <div className='totals'>
          <div className='custom-container'>
            <h2 className='cartHeading'>Cart Total</h2>
            <p className='paragraph1'>
              SubTotal{" "}
              <span className='spantag'>
                $200
              </span>
            </p>
            <p className='paragraph1'>
              Shipping{" "}
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam, illum.
              </span>
            </p>
          </div>
          <p className='paragraph2'>
            {" "}
            Total <span className='spantag'>$200</span>
          </p>
          <button className='btn'>CheckOut</button>
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

export default Cart