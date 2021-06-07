import Product from './Product'
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { orderHighestPrice, orderLowestPrice } from '../utils'

const GridProducts = () => {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        axios.get('https://coding-challenge-api.aerolab.co/products', {
            headers: {
                'Authorization': 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN
            }
        })
        .then(function (response) {
            setProducts(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
    }, [])

    const orderLow = () => {
        const orderedProducts = orderLowestPrice(products);
        setProducts([...orderedProducts]);
    }

    const orderHigh = () => {
        const orderedProducts = orderHighestPrice(products);
        setProducts([...orderedProducts])
    }

    return (
        <>
            <section className="grid-products-filters">
                <article className="quantity">
                    <span>16 of 32 products</span>
                </article>
                <span className="grid-divider"></span>
                <article className="sort-by">
                    <span>Sort by:</span>
                    <div className="filters">
                        <button className="default-button">Most recent</button>
                        <button className="default-button" onClick={() => orderLow()}>Lowest price</button>
                        <button className="default-button" onClick={() => orderHigh()}>Highest price</button>
                    </div>
                </article>
            </section>
            <section className="grid-products-container">
                {products ? products.map((product) => <Product Item={product} key={product._id}></Product> ) : null}
            </section>
        </>
    )
}

export default GridProducts;