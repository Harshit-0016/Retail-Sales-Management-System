import { useEffect, useRef, useState } from "react";

function Dropdown({ label, children, className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 ${className}`}
      >
        {label}
        <span className="text-[10px]">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-3 text-xs text-gray-700 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export default function FiltersToolbar({
  search,
  onSearch,
  filters,
  onFilterChange,
  sort,
  onSortChange,
  onReset,
}) {
  const [localSearch, setLocalSearch] = useState(search || "");

  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearch.trim());
  };

  const toggleMulti = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    onFilterChange({ ...filters, [key]: next });
  };

  const setFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const sortLabelMap = {
    date: "Date (Newest First)",
    quantity: "Quantity",
    customerName: "Customer Name (A–Z)",
  };

  const sortLabel = sortLabelMap[sort.sortBy] || "Date (Newest First)";

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-3 py-3 shadow-sm">
      {/* refresh + filter buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200"
          title="Reset filters"
        >
          ↻
        </button>

        <Dropdown label="Customer Region">
          {["North", "South", "East", "West", "Central"].map((r) => (
            <label key={r} className="flex items-center gap-2 py-0.5">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-300"
                checked={filters.regions?.includes(r) || false}
                onChange={() => toggleMulti("regions", r)}
              />
              {r}
            </label>
          ))}
        </Dropdown>

        <Dropdown label="Gender">
          {["Male", "Female"].map((g) => (
            <label key={g} className="flex items-center gap-2 py-0.5">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-300"
                checked={filters.genders?.includes(g) || false}
                onChange={() => toggleMulti("genders", g)}
              />
              {g}
            </label>
          ))}
        </Dropdown>

        <Dropdown label="Age Range">
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full rounded-lg border border-gray-300 px-2 py-1"
              value={filters.ageMin || ""}
              onChange={(e) => setFilter("ageMin", e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-full rounded-lg border border-gray-300 px-2 py-1"
              value={filters.ageMax || ""}
              onChange={(e) => setFilter("ageMax", e.target.value)}
            />
          </div>
        </Dropdown>

        <Dropdown label="Product Category">
          {["Electronics", "Clothing", "Beauty", "Grocery"].map((cat) => (
            <label key={cat} className="flex items-center gap-2 py-0.5">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-300"
                checked={filters.categories?.includes(cat) || false}
                onChange={() => toggleMulti("categories", cat)}
              />
              {cat}
            </label>
          ))}
        </Dropdown>

        <Dropdown label="Tags">
          <input
            type="text"
            placeholder="Comma separated tags"
            className="w-full rounded-lg border border-gray-300 px-2 py-1"
            value={filters.tags || ""}
            onChange={(e) => setFilter("tags", e.target.value)}
          />
        </Dropdown>

        <Dropdown label="Payment Method">
          {["Cash", "Credit Card", "Debit Card", "UPI"].map((m) => (
            <label key={m} className="flex items-center gap-2 py-0.5">
              <input
                type="checkbox"
                className="h-3 w-3 rounded border-gray-300"
                checked={filters.paymentMethods?.includes(m) || false}
                onChange={() => toggleMulti("paymentMethods", m)}
              />
              {m}
            </label>
          ))}
        </Dropdown>

        <Dropdown label="Date">
          <div className="space-y-2">
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-2 py-1"
              value={filters.startDate || ""}
              onChange={(e) => setFilter("startDate", e.target.value)}
            />
            <input
              type="date"
              className="w-full rounded-lg border border-gray-300 px-2 py-1"
              value={filters.endDate || ""}
              onChange={(e) => setFilter("endDate", e.target.value)}
            />
          </div>
        </Dropdown>
      </div>

        {/* Sort dropdown */}
        <Dropdown label={`Sort by: ${sortLabel}`} >
          <div className="space-y-2">
            <div>
              <p className="mb-1 text-[11px] text-gray-500">Field</p>
              <select
                className="w-full rounded-lg border border-gray-300 px-2 py-1"
                value={sort.sortBy}
                onChange={(e) =>
                  onSortChange({ ...sort, sortBy: e.target.value })
                }
              >
                <option value="customerName">Customer Name (A–Z)</option>
                <option value="date">Date (Newest First)</option>
                <option value="quantity">Quantity</option>
              </select>
            </div>
            <div>
              <p className="mb-1 text-[11px] text-gray-500">Order</p>
              <select
                className="w-full rounded-lg border border-gray-300 px-2 py-1"
                value={sort.sortOrder}
                onChange={(e) =>
                  onSortChange({ ...sort, sortOrder: e.target.value })
                }
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </Dropdown>
      </div>
   
  );
}
