'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { getProductById } from '@/utils/api'
import { Product } from '@/types/product'
import Header from '@/components/Header'

export default function ProductPage() {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id as string)
                setProduct(data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch product')
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const addToCart = () => {
        if (product) {
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            }

            const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
            const existingItemIndex = existingCart.findIndex((item: any) => item.id === product.id)

            if (existingItemIndex > -1) {
                existingCart[existingItemIndex].quantity += quantity
            } else {
                existingCart.push(cartItem)
            }

            localStorage.setItem('cart', JSON.stringify(existingCart))
            alert('Product added to cart!')
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!product) return <div>Product not found</div>

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/2">
                            <Image src={product.image} alt={product.name} width={600} height={600} className="w-full rounded-lg shadow-lg" />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <p className="mt-2 text-3xl font-bold text-gray-900">${product.price}</p>
                            <div className="mt-4 border-t border-b border-gray-200 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4"></path></svg>
                                        </button>
                                        <span className="mx-2 text-gray-700">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 focus:outline-none focus:text-gray-600">
                                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4"></path></svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={addToCart}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                                <p className="mt-2 text-gray-600">{product.description}</p>
                            </div>
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold text-gray-900">Features</h2>
                                <ul className="mt-2 list-disc list-inside text-gray-600">
                                    <li>High-quality materials</li>
                                    <li>Durable construction</li>
                                    <li>Comfortable design</li>
                                    <li>Easy to clean and maintain</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}