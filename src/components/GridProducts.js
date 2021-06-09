import Product from './Product'
import arrowLeftIcon from '../assets/icons/arrow-left.svg'
import arrowRightIcon from '../assets/icons/arrow-right.svg'

import React, { useState, useEffect } from "react";
import { orderHighestPrice, orderLowestPrice, paginationProducts } from '../utils'
import { getProducts, getHistory } from '../api'

const GridProducts = ({ Points, openModal }) => {
  const [products, setProducts] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [parsedProducts, setParsedProducts] = useState([]);
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    updateProducts();
    updateHistory();
  }, [])

  const updateProducts = () => {
    getProducts()
      .then(function (response) {
        setProducts(response.data);
        let productsPages = paginationProducts(response.data);
        setParsedProducts(productsPages);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const updateHistory = () => {
    getHistory()
      .then(function (response) {
        setHistoryProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const orderRecent = () => {
    const orderedProducts = historyProducts.reverse();
    updateProductsPages([...orderedProducts]);
    setActiveFilter('More recent');
  }

  const orderLow = () => {
    const orderedProducts = orderLowestPrice(products);
    updateProductsPages([...orderedProducts]);
    setActiveFilter('Lower price');
  }

  const orderHigh = () => {
    const orderedProducts = orderHighestPrice(products);
    updateProductsPages([...orderedProducts]);
    setActiveFilter('Higher price')
  }

  const updateProductsPages = (productsOrdered) => {
    const productsPages = paginationProducts(productsOrdered);
    console.log(productsPages);
    setParsedProducts(productsPages);
    setCurrentPage(0);
  }

  const productsViewed = () => {
    let count = 0;
    let page = currentPage;
    parsedProducts.forEach((productsArray, index) => {
      if(index <= page){
        count += productsArray.length;
      }
    })
    return count;
  }

  const prevPage = () => {
    console.log(parsedProducts[currentPage - 1])
    setCurrentPage(currentPage - 1)
  }
  
  const nextPage = () => {
    console.log(parsedProducts[currentPage + 1])
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <section className="grid-products-filters">
        <article className="quantity">
          <span>{productsViewed()} of {activeFilter === 'More recent' ? historyProducts?.length : products?.length} products</span>
        </article>
        <span className="grid-divider"></span>
        <article className="sort-by">
          <span>Sort by:</span>
          <div className="filters">
            <button className={`default-button ${activeFilter === 'More recent' ? 'active' : 'none'}`} onClick={() => orderRecent()}>Most recent</button>
            <button className={`default-button ${activeFilter === 'Lower price' ? 'active' : 'none'}`} onClick={() => orderLow()}>Lowest price</button>
            <button className={`default-button ${activeFilter === 'Higher price' ? 'active' : 'none'}`} onClick={() => orderHigh()}>Highest price</button>
          </div>
        </article>
        <article className="pages">
          <div className="container">
            {currentPage !== 0 ?
              <img className="arrow-button" onClick={() => { prevPage() }} src={arrowLeftIcon} alt="" />
              : null}
          </div>
          <div className="container">
            {currentPage !== parsedProducts.length - 1 ?
              <img className="arrow-button" onClick={() => { nextPage() }} src={arrowRightIcon} alt="" />
              : null}
          </div>
        </article>
      </section>
      <section className="grid-products-container">
        {parsedProducts.length > 0 ?
          parsedProducts[currentPage].map((product, index) => <Product 
            Item={product} 
            UserPoints={Points} 
            key={product._id + index} 
            openModal={openModal}
            updateHistoryProducts={() => updateHistory()}></Product>)
          : null}
      </section>
      <section className="grid-products-filters footer">
        <article className="quantity">
          <span>{productsViewed()} of {products?.length} products</span>
        </article>
      </section>
    </>
  )
}

export default GridProducts;