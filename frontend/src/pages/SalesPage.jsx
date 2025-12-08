import { useState, useEffect, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import FiltersToolbar from "../components/FiltersToolbar";
import SearchBar from "../components/SearchBar";
import SummaryCards from "../components/SummaryCards";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";
import { fetchSales } from "../services/api";

const initialFilters = {
  regions: [],
  genders: [],
  ageMin: "",
  ageMax: "",
  categories: [],
  paymentMethods: [],
  startDate: "",
  endDate: "",
  tags: "",
};

const initialSort = {
  sortBy: "customerName",
  sortOrder: "asc",
};

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState(initialSort);

  const loadSales = async () => {
    try {
      setError("");

      const tagsArray =
        filters.tags && filters.tags.trim()
          ? filters.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

      const data = await fetchSales({
        search,
        page,
        limit,
        filters: {
          ...filters,
          tags: tagsArray,
        },
        sort,
      });

      setSales(data.items || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to load sales data.");
    }
  };

  useEffect(() => {
    loadSales();
  }, [search, page, JSON.stringify(filters), sort.sortBy, sort.sortOrder]);

  const totals = useMemo(() => {
    const totalRecords = sales.length;
    const totalQuantity = sales.reduce(
      (sum, row) => sum + (row["Quantity"] || 0),
      0
    );
    const totalAmount = sales.reduce(
      (sum, row) => sum + (row["Total Amount"] || 0),
      0
    );
    const totalFinalAmount = sales.reduce(
      (sum, row) => sum + (row["Final Amount"] || 0),
      0
    );
    const totalDiscount = totalAmount - totalFinalAmount;

    return {
      totalRecords,
      totalQuantity,
      totalAmount,
      totalFinalAmount,
      totalDiscount,
    };
  }, [sales]);

  return (
    <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-4 overflow-x-hidden">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Sales Management System
          </h2>

          <div className="flex justify-end mb-4">
            <SearchBar
              value={search}
              onSearch={(term) => {
                setSearch(term);
                setPage(1);
              }}
            />
          </div>

          <FiltersToolbar
            filters={filters}
            onFilterChange={(next) => {
              setFilters(next);
              setPage(1);
            }}
            sort={sort}
            onSortChange={(next) => {
              setSort(next);
              setPage(1);
            }}
            onReset={() => {
              setFilters(initialFilters);
              setSort(initialSort);
              setSearch("");
              setPage(1);
            }}
          />

          <SummaryCards totals={totals} />

          {/* ERROR */}
          {error && (
            <div className="mb-3 rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* TABLE */}
          <SalesTable sales={sales} />

          {/* PAGINATION */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}
