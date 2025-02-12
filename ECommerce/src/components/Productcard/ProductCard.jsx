import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/ReducerSlice';
import "../Productcard/ProductCard.css"
import { ToastContainer, toast } from 'react-toastify';

function ProductCard(product) {
  const id = product.product.productId;
  // console.log(id)

  const title = (product.product.title).slice(0, 36)
 
  const userInfo = useSelector((state) => state.bazaar.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (userInfo) {
      dispatch(
        addToCart({
          id: product.product.productId,
          title: product.product.title,
          image: product.product.productImage,
          price: product.product.price,
          quantity: 1,
          description: product.product.description,
        })
      );
      toast.success(`${product.product.title} is added`);
    } else {
      toast.error("please login first");
    }
  };

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
      <img src={`data:image/jpeg;base64,${product.product.productImage}`} alt="Productimage" />
        <b><p>{title}</p></b>
        <p>${product.product.price}</p>
      </div>
      <button className='custom-element' onClick={handleAddToCart}
        >addToCart</button>
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