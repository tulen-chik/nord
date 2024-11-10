import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { rows } = await sql`SELECT * FROM products WHERE id = ${params.id}`
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json(rows[0])
    } catch (error) {
        console.error('Failed to fetch product:', error)
        return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, description, price, image } = await request.json()
        const { rowCount } = await sql`
      UPDATE products
      SET name = ${name}, description = ${description}, price = ${price}, image = ${image}
      WHERE id = ${params.id}
    `
        if (rowCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Product updated successfully' })
    } catch (error) {
        console.error('Failed to update product:', error)
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { rowCount } = await sql`DELETE FROM products WHERE id = ${params.id}`
        if (rowCount === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Product deleted successfully' })
    } catch (error) {
        console.error('Failed to delete product:', error)
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
    }
}