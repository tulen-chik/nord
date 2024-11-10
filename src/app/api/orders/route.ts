import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
    try {
        const { user_id, total_price, shipping_address, order_items } = await request.json()
        const { rows } = await sql`
      INSERT INTO orders (user_id, total_price, shipping_address)
      VALUES (${user_id}, ${total_price}, ${JSON.stringify(shipping_address)})
      RETURNING id
    `
        const order_id = rows[0].id

        for (const item of order_items) {
            await sql`
        INSERT INTO order_items (order_id, product_id, quantity)
        VALUES (${order_id}, ${item.product_id}, ${item.quantity})
      `
        }

        return NextResponse.json({ id: order_id })
    } catch (error) {
        console.error('Failed to create order:', error)
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }
}