const express = require("express");
const router = express.Router();
const Component = require("../models/Component");

// Middleware to get component by ID
async function getComponent(req, res, next) {
  let component;
  try {
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

// Get all components
router.get("/", async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific component by ID with middleware
router.get("/:id", getComponent, (req, res) => {
  res.json(res.component);
});

// Create a new component
router.post("/", async (req, res) => {
  const component = new Component({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    properties: req.body.properties,
  });

  try {
    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a component
router.patch("/:id", getComponent, async (req, res) => {
  if (req.body.name != null) {
    res.component.name = req.body.name;
  }
  if (req.body.description != null) {
    res.component.description = req.body.description;
  }
  if (req.body.category != null) {
    res.component.category = req.body.category;
  }
  if (req.body.properties != null) {
    res.component.properties = req.body.properties;
  }

  try {
    const updatedComponent = await res.component.save();
    res.json(updatedComponent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a component
router.delete("/:id", getComponent, async (req, res) => {
  try {
    await res.component.deleteOne();
    res.json({ message: "Component deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
