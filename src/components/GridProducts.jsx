import Product from './Product'

const GridProducts = () => {
    return (
        <>
            <section class="grid-products-filters">
                <article class="quantity">
                    <span>16 of 32 products</span>
                </article>
                <span class="grid-divider"></span>
                <article class="sort-by">
                    <span>Sort by:</span>
                    <div class="filters">
                        <button class="default-button">Most recent</button>
                        <button class="default-button">Lowest price</button>
                        <button class="default-button">Highest price</button>
                    </div>
                </article>
            </section>
            <section class="grid-products-container">
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
            </section>
        </>
    )
}

export default GridProducts;