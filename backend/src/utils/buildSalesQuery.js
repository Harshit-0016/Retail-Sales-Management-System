export function buildSalesQuery(params) {
  const {
    search,
    regions,
    genders,
    ageMin,
    ageMax,
    categories,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10
  } = params;

  const filters = {};

  //  Search (Customer Name, Phone Number)
  if (search && search.trim()) {
    const trimmed = search.trim();
    const regex = new RegExp(trimmed, "i");

    const orConditions = [
      { "Customer Name": regex } 
    ];

    const asNumber = Number(trimmed);
    if (!Number.isNaN(asNumber)) {
      orConditions.push({ "Phone Number": asNumber });
    }

    filters.$or = orConditions;
  }

  if (regions?.length) filters["Customer Region"] = { $in: regions };
  if (genders?.length) filters["Gender"] = { $in: genders };
  if (categories?.length) filters["Product Category"] = { $in: categories };
  if (paymentMethods?.length) filters["Payment Method"] = { $in: paymentMethods };

  if (tags?.length) {
    filters["Tags"] = {
      $in: tags.map((t) => new RegExp(t, "i")) 
    };
  }

  if (ageMin || ageMax) {
    const ageFilter = {};
    if (ageMin) ageFilter.$gte = Number(ageMin);
    if (ageMax) ageFilter.$lte = Number(ageMax);

    if (ageFilter.$gte && ageFilter.$lte && ageFilter.$gte > ageFilter.$lte) {
      const tmp = ageFilter.$gte;
      ageFilter.$gte = ageFilter.$lte;
      ageFilter.$lte = tmp;
    }

    filters["Age"] = ageFilter;
  }

  if (startDate || endDate) {
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    filters["Date"] = dateFilter;
  }

  let sort = {};
  const safeSortOrder = sortOrder === "asc" ? 1 : -1;

  switch (sortBy) {
    case "quantity":
      sort = { "Quantity": safeSortOrder };
      break;
    case "customerName":
      sort = { "Customer Name": safeSortOrder };
      break;
    case "date":
    default:
      sort = { "Date": -1 }; 
  }

  const pageNumber = Math.max(1, Number(page) || 1);
  const pageSize = Number(limit) || 10;
  const skip = (pageNumber - 1) * pageSize;

  return { filters, sort, pageNumber, pageSize, skip };
}
