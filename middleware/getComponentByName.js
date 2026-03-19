const express = require("express");
const router = express.Router({ caseSensitive: false });
const Component = require("../models/Component");

// Middleware to get component by name
async function getComponentByName(req, res, next) {
  let component;

  try {
    component = await Component.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    console.log(component);
    if (component == null) {
      return res.status(404).json({ message: "Component not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.component = component;
  next();
}

module.exports = getComponentByName;
