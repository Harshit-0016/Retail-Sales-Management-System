export default function SummaryCards({ totals }) {
  const {
    totalQuantity = 0,
    totalAmount = 0,
    totalDiscount = 0,
    totalRecords = 0,
  } = totals || {};

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

  return (
    <div className="mb-3 flex flex-wrap gap-3">
      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
          Total units sold
          <span className="cursor-help text-gray-400">ℹ️</span>
        </p>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {totalQuantity.toLocaleString("en-IN")}
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
          Total Amount
          <span className="cursor-help text-gray-400">ℹ️</span>
        </p>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {formatCurrency(totalAmount)}{" "}
          <span className="text-xs text-gray-500">
            ({totalRecords} SRs)
          </span>
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <p className="flex items-center gap-1 text-xs font-medium text-gray-500">
          Total Discount
          <span className="cursor-help text-gray-400">ℹ️</span>
        </p>
        <p className="mt-1 text-lg font-semibold text-gray-900">
          {formatCurrency(totalDiscount)}{" "}
          <span className="text-xs text-gray-500">
            ({totalRecords} SRs)
          </span>
        </p>
      </div>
    </div>
  );
}
