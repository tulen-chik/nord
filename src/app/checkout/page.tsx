'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createOrder } from '@/utils/api'
import Header from '@/components/Header'

interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
}

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [deliveryMethod, setDeliveryMethod] = useState('pickup')
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        city: 'Saint Petersburg',
    })
    const router = useRouter()

    useEffect(() => {
        const storedCart = localStorage.getItem('cart')
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryCost = deliveryMethod === 'pickup' ? 170 : 265
    const total = subtotal + deliveryCost

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const orderData = {
                user_id: 'guest', // You might want to implement user authentication
                total_price: total,
                shipping_address: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    city: formData.city,
                    delivery_method: deliveryMethod,
                },
                order_items: cartItems.map(item => ({
                    product_id: item.id,
                    quantity: item.quantity,
                })),
            }
            const createdOrder = await createOrder(orderData)
            console.log('Order created:', createdOrder)
            localStorage.removeItem('cart')
            router.push('/order-success')
        } catch (error) {
            console.error('Failed to create order:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header cartItemsCount={cartItems.length} />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Full Name*</Label>
                                    <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number*</Label>
                                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <Label htmlFor="city">City*</Label>
                                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Delivery</h3>
                                    <RadioGroup defaultValue="pickup" onValueChange={setDeliveryMethod}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="pickup" id="pickup" />
                                            <Label htmlFor="pickup">
                                                Pickup
                                                <p className="text-sm text-gray-500">Convenient pickup from our store</p>
                                                <p className="text-sm font-semibold">$170</p>
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <RadioGroupItem value="courier" id="courier" />
                                            <Label htmlFor="courier">
                                                Courier Delivery
                                                <p className="text-sm text-gray-500">Delivery to your door</p>
                                                <p className="text-sm font-semibold">$265</p>
                                                <p className="text-sm text-gray-500">Delivery time: 1 - 2 business days</p>
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition duration-200 mt-8">
                                    Place Order
                                </button>
                            </form>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <Image src={item.image} alt={item.name} width={50} height={50} className="mr-4" />
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-500">{item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">${item.quantity * item.price}</p>
                                </div>
                            ))}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Delivery</span>
                                    <span>${deliveryCost}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg mt-4">
                                    <span>Total:</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}