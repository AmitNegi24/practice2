import React from 'react';
import Products from '../Products/Products';
import Banner from '../../components/Banner/Banner';
import './Home.css';

function Home() {
  return (
    <div>
      <header className='banner'>
        <Banner />
      </header>
      <section className='content-container'>
        <div className='centered'>
          <h1>Our Products</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, id quos. Velit earum, iusto labore ab consectetur nemo maxime fuga! Quis ad voluptatem necessitatibus itaque asperiores eveniet? Unde voluptate pariatur minima itaque.
          </p>
        </div>
      </section>
      <section className='product-container'>
        <Products />
      </section>
    </div>
  );
}

export default Home;
