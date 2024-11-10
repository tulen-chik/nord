'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import CartItem from '@/components/CartItem'

interface CartItemType {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItemType[]>([])
    const [promoCode, setPromoCode] = useState('')
    const router = useRouter()

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const updateQuantity = (id: string, newQuantity: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
            )
        )
    }

    const removeItem = (id: string) => {
        setCartItems(items => items.filter(item => item.id !== id))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const handleCheckout = () => {
        router.push('/checkout')
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={cartItems.length} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Cart</h1>
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                            {cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    {...item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                            <div className="p-4">
                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-200">
                                        Apply
                                    </button>
                                </div>
                                <div className="flex justify-between items-center  mb-4">
                                    <span className="text-lg font-medium text-gray-900">Total:</span>
                                    <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200"
                                    onClick={handleCheckout}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}