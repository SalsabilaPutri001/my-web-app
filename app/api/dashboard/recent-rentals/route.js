import { executeQuery } from '@/lib/db.js';

export async function GET() {
  try {
    const results = await executeQuery(`
      SELECT 
        r.rental_id,
        c.first_name,
        c.last_name,
        f.title,
        r.rental_date,
        r.return_date,
        p.amount
      FROM rental r
      JOIN customer c ON r.customer_id = c.customer_id
      JOIN inventory i ON r.inventory_id = i.inventory_id
      JOIN film f ON i.film_id = f.film_id
      LEFT JOIN payment p ON r.rental_id = p.rental_id
      ORDER BY r.rental_date DESC
      LIMIT 10
    `);

    return Response.json({
      success: true,
      data: results
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
