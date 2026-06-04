export function RecentRentalsTable({ data }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Rentals</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Film</th>
              <th className="px-4 py-2 text-left">Rental Date</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((rental, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{rental.first_name} {rental.last_name}</td>
                <td className="px-4 py-2">{rental.title}</td>
                <td className="px-4 py-2">
                  {new Date(rental.rental_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-right font-semibold">
                  ${rental.amount?.toFixed(2) || '0.00'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
