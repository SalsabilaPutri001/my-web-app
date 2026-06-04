import { executeQuery } from '@/lib/db';

// Contoh: Cari film berdasarkan judul
export async function POST(request) {
  try {
    const { title } = await request.json();
    
    if (!title) {
      return Response.json(
        { success: false, message: 'Title parameter diperlukan' },
        { status: 400 }
      );
    }

    const results = await executeQuery(
      'SELECT film_id, title, description, release_year FROM film WHERE title LIKE ?',
      [`%${title}%`]
    );
    
    return Response.json({
      success: true,
      data: results,
      message: `Ditemukan ${results.length} film`
    });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
