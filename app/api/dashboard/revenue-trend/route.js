import { executeQuery } from '@/lib/db.js';

export async function GET() {
  try {
    const results = await executeQuery(`
      SELECT 
        DATE(r.rental_date) as rental_date,
        COUNT(*) as rental_count,
        SUM(p.amount) as daily_revenue
      FROM rental r
      LEFT JOIN payment p ON r.rental_id = p.rental_id
      WHERE r.rental_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(r.rental_date)
      ORDER BY rental_date DESC
      LIMIT 30
    `);

    return Response.json({
      success: true,
      data: results.reverse()
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
