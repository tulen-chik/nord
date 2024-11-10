import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
            <Image className="h-48 w-full object-cover" src={product.image} alt={product.name} width={300} height={300} />
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">${product.price}</p>
            </div>
        </Link>
    )
}