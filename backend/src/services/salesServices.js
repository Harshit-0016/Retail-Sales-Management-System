import { Sale } from "../models/sale.js";
import { buildSalesQuery } from "../utils/buildSalesQuery.js";

export async function getSales(params) {

  // Use helper for filters & sort
  const {
    filters,
    sort,
    pageNumber: rawPageNumber,
    pageSize: rawPageSize,
  } = buildSalesQuery(params);

  // Sanitize page & size
  let pageNumber = parseInt(rawPageNumber, 10);
  if (Number.isNaN(pageNumber) || pageNumber < 1) pageNumber = 1;

  let pageSize = parseInt(rawPageSize, 10);
  if (Number.isNaN(pageSize) || pageSize < 1) pageSize = 10;
  if (pageSize > 500) pageSize = 500; // optional hard cap

  // Total docs for filters
  const total = await Sale.countDocuments(filters);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  // If page beyond range, return empty page
  if (pageNumber > totalPages) {
    return {
      items: [],
      meta: {
        page: pageNumber,
        pageSize,
        totalItems: total,
        totalPages,
      },
      message: "Requested page is beyond available range.",
    };
  }

  const skip = (pageNumber - 1) * pageSize;

  // Main query – allow disk use for sort
  const items = await Sale.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(pageSize)
    .allowDiskUse(true)   
    .lean();

  return {
    items,
    meta: {
      page: pageNumber,
      pageSize,
      totalItems: total,
      totalPages,
    },
  };
}
