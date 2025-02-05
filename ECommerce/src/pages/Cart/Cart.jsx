import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import './Cart.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
function Cart() {

  const productData = useSelector((state) => state.bazaar.productData);
  const userInfo=useSelector((state)=>state.bazaar.userInfo)
  const [totalAmount, setTotalAmount] = useState("");
  const [payNow,setPayNow] = useState(false);
   const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    })
    setTotalAmount(price);
  }, [productData])

  const handleCheckOut=()=>{
    if(userInfo){
      console.log("checkout button clicked")
      setPayNow(true);
      navigate("/checkout");
    }
    else{
      toast.error("please login first");
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className='items'>
        <CartItem />
        <div className='totals'>
          <div className='custom-container'>
            <h2 className='cartHeading'>Cart Total</h2>
            <p className='paragraph1'>
              SubTotal{" "}
              <span className='spantag'>
                ${totalAmount}
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
            Total <span className='spantag'>${totalAmount}</span>
          </p>
          <button onClick={handleCheckOut} className='btn'>CheckOut</button>
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