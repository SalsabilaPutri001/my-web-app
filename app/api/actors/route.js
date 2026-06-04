import { executeQuery } from '@/lib/db';

export async function GET(request) {
  try {
    const results = await executeQuery(
      'SELECT actor_id, first_name, last_name FROM actor LIMIT 10'
    );
    
    return Response.json({
      success: true,
      data: results,
      message: 'Data aktor dari database Sakila'
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
