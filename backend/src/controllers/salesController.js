import { getSales } from "../services/salesServices.js";

export async function getSalesHandler(req, res) {
  try {
    const parseMulti = (value) =>
      typeof value === "string" ? value.split(",").filter(Boolean) : value;
    
    const params = {
      search: req.query.search || "",
      regions: parseMulti(req.query.regions),
      genders: parseMulti(req.query.genders),
      categories: parseMulti(req.query.categories),
      tags: parseMulti(req.query.tags),
      paymentMethods: parseMulti(req.query.paymentMethods),
      ageMin: req.query.ageMin,
      ageMax: req.query.ageMax,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      sortBy: req.query.sortBy || "date",
      sortOrder: req.query.sortOrder || "desc",
      page: req.query.page || 1,
      limit: 10,
    };

    const data = await getSales(params);

    if (data.items.length === 0) {
      return res.status(200).json({
        ...data,
        message: "No transaction matched",
      });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({
      error: "Something went wrong while fetching sales data",
    });
  }
}
