export const orderMostRecent = (products) =>{
    
}

export const orderLowestPrice = (products) =>{
    return products.sort((a, b) => a.cost - b.cost);
}

export const orderHighestPrice = (products) =>{
    return products.sort((a, b) => b.cost - a.cost);
}

export const paginationProducts = ([...products]) => {
    let newArray = []; 
    while(products.length !== 0){
        let page = products.splice(0, 16);
        newArray.push(page);
    }
    return newArray;
}