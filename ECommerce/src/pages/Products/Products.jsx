import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../../components/Productcard/ProductCard';
import '../Products/Products.css'
function Products() {
    const [Data, setData] = useState([]);
    const fetchData = () => {
        axios.get("http://localhost:8080/api/product-api/products")
            .then((res) => {
                const data1 = res.data
                setData(data1);
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className='products-container'>
            {
                Data.map((item) => {
                    return (
                        <ProductCard key={item.id} product={item} />
                    )

                })
            }
        </div>
    )
}

export default Products