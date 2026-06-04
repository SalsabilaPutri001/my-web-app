import { executeQuery } from '@/lib/db';

export async function GET(request) {
  try {
    const results = await executeQuery(
      'SELECT film_id, title, description, release_year FROM film LIMIT 10'
    );
    
    return Response.json({
      success: true,
      data: results,
      message: 'Data film dari database Sakila'
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message
      },
      { status: 500 }
    );
  }
}
