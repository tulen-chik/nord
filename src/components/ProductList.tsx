'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/utils/api'
import { Product } from '@/types/product'

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch products')
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
                    <Image className="h-48 w-full object-cover" src={product.image} alt={product.name} width={300} height={300} />
                    <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 text-xl font-semibold text-gray-900">${product.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}