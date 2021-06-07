export const orderMostRecent = (products) =>{
    
}

export const orderLowestPrice = (products) =>{
    return products.sort((a, b) => a.cost - b.cost);
}

export const orderHighestPrice = (products) =>{
    return products.sort((a, b) => b.cost - a.cost);
}