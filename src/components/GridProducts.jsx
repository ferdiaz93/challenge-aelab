import Product from './Product'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { orderHighestPrice, orderLowestPrice, paginationProducts } from '../utils'

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

    useEffect(() => {

    }, [])

    const updateProducts = () => {
        axios.get('https://coding-challenge-api.aerolab.co/products', {
            headers: {
                'Authorization': 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN
            }
        })
        .then(function (response) {
            setProducts(response.data);
            let productsPages = paginationProducts(response.data);
            setParsedProducts(productsPages);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const updateHistory = () => {
        axios.get('https://coding-challenge-api.aerolab.co/user/history', {
            headers: {
                'Authorization': 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN
            }
        })
        .then(function (response) {
            setHistoryProducts(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }

    const orderRecent = () => {
        let productsPages = paginationProducts(historyProducts);
        setParsedProducts(productsPages)
        setActiveFilter('More recent')
    }

    const orderLow = () => {
        const orderedProducts = orderLowestPrice(products);
        setProducts([...orderedProducts]);
        updateProductsPages([...orderedProducts]);
        setActiveFilter('Lower price');
    }

    const orderHigh = () => {
        const orderedProducts = orderHighestPrice(products);
        setProducts([...orderedProducts]);
        updateProductsPages([...orderedProducts]);
        setActiveFilter('Higher price')
    }

    const updateProductsPages = (productsOrdered) => {
        let productsPages = paginationProducts(productsOrdered);
        setParsedProducts(productsPages);
        setCurrentPage(0);
    }

    const productsViewed = () => {
        let count = 0;
        let page = currentPage;
        while (page >= 0) {
            count += parsedProducts[currentPage]?.length
            page--
        }
        return count;
    }

    return (
        <>
            <section className="grid-products-filters">
                <article className="quantity">
                    <span>{productsViewed()} of {activeFilter == 'More recent' ? historyProducts?.length : products?.length} products</span>
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
                            <img onClick={() => { setCurrentPage(currentPage - 1) }} src="./assets/icons/arrow-left.svg" alt="" />
                            : null}
                    </div>
                    <div className="container">
                        {currentPage !== parsedProducts.length - 1 ?
                            <img onClick={() => { setCurrentPage(currentPage + 1) }} src="./assets/icons/arrow-right.svg" alt="" />
                            : null}
                    </div>
                </article>
            </section>
            <section className="grid-products-container">
                {parsedProducts.length > 0 ?
                    parsedProducts[currentPage].map((product, index) => <Product Item={product} UserPoints={Points} key={product._id + index} openModal={openModal}></Product>)
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