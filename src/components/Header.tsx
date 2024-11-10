import Link from 'next/link'

interface HeaderProps {
    cartItemsCount?: number;
}

export default function Header({ cartItemsCount = 0 }: HeaderProps) {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="text-3xl font-bold text-gray-900">
                    HorseGear
                </Link>
                <nav className="flex items-center">
                    <Link href="/cart" className="text-gray-500 hover:text-gray-700">
                        Cart ({cartItemsCount})
                    </Link>
                </nav>
            </div>
        </header>
    )
}