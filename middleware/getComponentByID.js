const express = require("express");
const router = express.Router({ caseSensitive: false });
const Component = require("../models/Component");

// Middleware to get component by ID
async function getComponentByID(req, res, next) {
  let component;
  try {
    if (req.params.id.includes("name")) {
      res.status(404).json({
        message:
          "You are trying to fetch component by name, use /api/components/name/name-of-component endpoint instead",
      });
    }
    component = await Component.findById(req.params.id);
    if (component == null) {
      return res.status(404).json({ message: "Component not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.component = component;
  next();
}

module.exports = getComponentByID;
