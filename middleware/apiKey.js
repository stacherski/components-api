require("dotenv").config();

module.exports = function apiKeyMiddleware(req, res, next) {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) return next();

  const key = req.headers["x-api-key"] || req.query.api_key;
  if (!key || key !== API_KEY) {
    return res
      .status(401)
      .json({ error: "Unauthorized: invalid or missing API key" });
  }
  next();
};
