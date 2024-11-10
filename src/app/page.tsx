import Header from '@/components/Header'
import ProductList from '@/components/ProductList'

export default function Component() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <ProductList />
                </div>
            </main>
        </div>
    )
}