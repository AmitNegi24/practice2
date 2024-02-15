import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/ReducerSlice';
import "../Productcard/ProductCard.css"
import { ToastContainer, toast } from 'react-toastify';
function ProductCard(product) {
  const id = product.product.id;
  // console.log(id)

  const title = (product.product.title).slice(0, 36)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDetail = () => {
    // console.log("product details")
    navigate(`/product/${id}`,
      {
        state: {
          item: product,
        }
      }
    );

  }
  return (
    <div className="product-card" >
      <div className='card' onClick={productDetail}>
        <img src={product.product.image} />
        <b><p>{title}</p></b>
        <p>${product.product.price}</p>
      </div>
      <button className='custom-element' onClick={() => dispatch(addToCart({
        id: product.product.id,
        title: product.product.title,
        image: product.product.image,
        price: product.product.price,
        quantity: 1,
        description: product.product.description,
      })
      ) & toast.success(`${product.product.title} is added`)
      }>addToCart</button>
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

export default ProductCard