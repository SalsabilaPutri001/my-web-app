import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h2 className="text-2xl font-bold text-indigo-600">Sakila Film Rental</h2>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to Sales Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Manage and monitor your film rental business with real-time sales analytics powered by Sakila database.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Track sales, rentals, and revenue in real-time</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Charts</h3>
            <p className="text-gray-600">Visualize trends and performance metrics</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Film Management</h3>
            <p className="text-gray-600">Monitor top films and customer activity</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Go to Dashboard →
          </Link>
          <Link
            href="/api/actors"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            View API Docs
          </Link>
        </div>
      </main>
    </div>
  );
}

