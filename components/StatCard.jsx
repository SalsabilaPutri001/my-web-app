export function StatCard({ title, value, icon, color }) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-md text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-75">{title}</p>
          <p className="text-3xl font-bold mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className="text-4xl opacity-50">{icon}</div>
      </div>
    </div>
  );
}
