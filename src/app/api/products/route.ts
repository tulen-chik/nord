import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM products`
        return NextResponse.json(rows)
    } catch (error) {
        console.error('Failed to fetch products:', error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, description, price, image } = await request.json()
        const { rows } = await sql`
      INSERT INTO products (name, description, price, image)
      VALUES (${name}, ${description}, ${price}, ${image})
      RETURNING id
    `
        return NextResponse.json({ id: rows[0].id })
    } catch (error) {
        console.error('Failed to create product:', error)
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
    }
}