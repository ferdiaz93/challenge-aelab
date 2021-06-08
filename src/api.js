import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + process.env.REACT_APP_AEROLAB_TOKEN;

export const getUser = () => {
    return axios.get('https://coding-challenge-api.aerolab.co/user/me');
}

export const getProducts = () => {
    return axios.get('https://coding-challenge-api.aerolab.co/products');
}

export const getHistory = () => {
    return axios.get('https://coding-challenge-api.aerolab.co/user/history');
}

export const chargePoints = (amount) => {
    return axios.post('https://coding-challenge-api.aerolab.co/user/points', { amount: amount })
}

export const redeemProduct = (productId) => {
    return axios.post('https://coding-challenge-api.aerolab.co/redeem', { productId: productId })
}