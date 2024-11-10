import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface CartItemProps {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    updateQuantity: (id: string, newQuantity: number) => void;
    removeItem: (id: string) => void;
}

export default function CartItem({ id, name, price, image, quantity, updateQuantity, removeItem }: CartItemProps) {
    return (
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image src={image} alt={name} width={100} height={100} className="rounded-lg" />
                <div className="ml-4">
                    <h2 className="text-lg font-medium text-gray-900">{name}</h2>
                    <p className="text-gray-500">${price}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button
                    onClick={() => updateQuantity(id, quantity - 1)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <span className="mx-2 text-gray-700">{quantity}</span>
                <button
                    onClick={() => updateQuantity(id, quantity + 1)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <Plus className="h-5 w-5" />
                </button>
                <button
                    onClick={() => removeItem(id)}
                    className="ml-4 text-gray-500 hover:text-red-500"
                >
                    <Trash2 className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}