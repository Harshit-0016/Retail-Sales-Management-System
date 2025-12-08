const COLUMNS = [
  { label: "Transaction ID", key: "Transaction ID" },
  { label: "Date", key: "Date", type: "date" },
  { label: "Customer ID", key: "Customer ID" },
  { label: "Customer name", key: "Customer Name" },
  { label: "Phone Number", key: "Phone Number", type: "phone" },
  { label: "Gender", key: "Gender" },
  { label: "Age", key: "Age" },
  { label: "Product Category", key: "Product Category" },
  { label: "Quantity", key: "Quantity" },
  { label: "Total Amount", key: "Total Amount", type: "currency" },
  { label: "Customer region", key: "Customer Region" },
  { label: "Product ID", key: "Product ID" },
  { label: "Employee name", key: "Employee Name" },
];

function formatValue(value, type) {
  if (value === undefined || value === null || value === "") return "—";

  switch (type) {
    case "date":
      return new Date(value).toISOString().slice(0, 10);
    case "currency":
      return `₹ ${Number(value).toLocaleString("en-IN")}`;
    case "phone":
      return `+91 ${value}`;
    default:
      return value;
  }
}

export default function SalesTable({ sales = [] }) {
  if (!sales.length) {
    return (
      <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-sm text-gray-500">
        No transactions found for the selected criteria.
      </div>
    );
  }

  return (
    <div className="mt-4 w-full max-w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      
      <div className="w-full max-w-full overflow-x-auto">
        
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 bg-gray-50 text-xs font-semibold text-gray-600">
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left align-middle"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {sales.map((row, idx) => (
                <tr
                  key={row._id || idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className="px-4 py-2 align-middle text-gray-800"
                    >
                      {formatValue(row[col.key], col.type)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
