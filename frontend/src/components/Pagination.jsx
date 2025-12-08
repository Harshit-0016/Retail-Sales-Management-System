export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 2) return null;

  const goTo = (p) => {
    if (p >= 1 && p <= totalPages && p !== page) {
      onPageChange(p);
    }
  };

  const windowSize = 2;
  let start = Math.max(1, page - windowSize);
  let end = Math.min(totalPages, page + windowSize);

  if (page <= windowSize) {
    end = Math.min(totalPages, windowSize * 2 + 1);
  }
  if (page > totalPages - windowSize) {
    start = Math.max(1, totalPages - windowSize * 2);
  }

  const pages = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        Previous
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => goTo(1)}
            className={`h-8 min-w-8 rounded-full border px-3 text-xs font-medium cursor-pointer ${
              page === 1
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            1
          </button>
          {start > 2 && (
            <span className="px-1 text-sm text-gray-400">…</span>
          )}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goTo(p)}
          className={`h-8 min-w-8 rounded-full border px-3 text-xs font-medium cursor-pointer ${
            p === page
              ? "border-gray-900 bg-gray-900 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="px-1 text-sm text-gray-400">…</span>
          )}
          <button
            onClick={() => goTo(totalPages)}
            className={`h-8 min-w-8 rounded-full border px-3 text-xs font-medium cursor-pointer ${
              page === totalPages
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-100 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
