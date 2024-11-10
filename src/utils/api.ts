import axios from 'axios'

const api = axios.create({
    baseURL: '/api',
})

export const getProducts = async () => {
    const response = await api.get('/products')
    return response.data
}

export const getProductById = async (id: string) => {
    const response = await api.get(`/products/${id}`)
    return response.data
}

export const createOrder = async (orderData: any) => {
    const response = await api.post('/orders', orderData)
    return response.data
}