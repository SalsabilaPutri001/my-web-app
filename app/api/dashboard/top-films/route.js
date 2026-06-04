import { executeQuery } from '@/lib/db.js';

export async function GET() {
  try {
    const results = await executeQuery(`
      SELECT 
        f.title,
        COUNT(r.rental_id) as rental_count,
        SUM(p.amount) as revenue
      FROM rental r
      JOIN inventory i ON r.inventory_id = i.inventory_id
      JOIN film f ON i.film_id = f.film_id
      LEFT JOIN payment p ON r.rental_id = p.rental_id
      GROUP BY f.film_id, f.title
      ORDER BY rental_count DESC
      LIMIT 10
    `);

    const formattedData = results.map(item => ({
      title: item.title,
      rental_count: parseInt(item.rental_count) || 0,
      revenue: parseFloat(item.revenue) || 0
    }));

    return Response.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
