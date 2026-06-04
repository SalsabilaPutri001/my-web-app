import { executeQuery } from '@/lib/db.js';

export async function GET() {
  try {
    // Total Revenue
    const revenueResult = await executeQuery(
      'SELECT SUM(amount) as total FROM payment'
    );
    
    // Total Rentals
    const rentalResult = await executeQuery(
      'SELECT COUNT(*) as total FROM rental'
    );
    
    // Total Customers
    const customerResult = await executeQuery(
      'SELECT COUNT(*) as total FROM customer'
    );
    
    // Total Films
    const filmResult = await executeQuery(
      'SELECT COUNT(*) as total FROM film'
    );

    return Response.json({
      success: true,
      data: {
        totalRevenue: revenueResult[0].total || 0,
        totalRentals: rentalResult[0].total || 0,
        totalCustomers: customerResult[0].total || 0,
        totalFilms: filmResult[0].total || 0
      }
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
