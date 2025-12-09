const API_URL = import.meta.env.VITE_API_BASE_URL;


export async function fetchSales({
  search = "",
  page = 1,
  limit = 10,
  filters = {},
  sort = {}
} = {}) {

  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  // search
  if (search.trim()) {
    params.set("search", search.trim());
  }

  // filters 
  Object.entries(filters).forEach(([key, value]) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.set(key, value);
    }
  });

  // sorting
  if (sort.sortBy) params.set("sortBy", sort.sortBy);
  if (sort.sortOrder) params.set("sortOrder", sort.sortOrder);

  // Fetch with timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds

  try {
    const response = await fetch(`${API_URL}/sales?${params.toString()}`, {
      method: "GET",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Try again.");
    }
    throw new Error(err.message || "Failed to fetch sales");
  }
}
