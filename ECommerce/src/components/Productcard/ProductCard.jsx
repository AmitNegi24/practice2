import React from 'react'
import { useNavigate } from 'react-router-dom';

import "../Productcard/ProductCard.css"
function ProductCard(product) {
  const id = product.product.id;
  console.log(id)

  const navigate = useNavigate();

  const productDetail = () => {
    console.log("product details")
    navigate(`/product/${id}`,
      {
        state: {
          item: product,
        }
      }
    );

  }
  return (
    <div className="product-card" onClick={productDetail}>
      <div className='card'>
        <img src={product.product.image} />
        <b><p>{product.product.title}</p></b>
        <p>${product.product.price}</p>
      </div>

    </div>
  )
}

export default ProductCard