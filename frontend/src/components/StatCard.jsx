function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">

      <p className="text-gray-500 text-sm mb-2">
        {title}
      </p>

      <h2
        className={`text-3xl font-bold ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}

export default StatCard;