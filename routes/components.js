const express = require("express");
const router = express.Router();
const Component = require("../models/Component");

// Middleware to get component by ID
async function getComponentByID(req, res, next) {
  let component;
  try {
    if (req.params.id.includes("name")) {
      res.status(404).json({
        message:
          "You are trying to fetch component by name, use /components/name/name-of-component endpoint instead",
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

// Middleware to get component by name
async function getComponentByName(req, res, next) {
  let component;

  try {
    component = await Component.find({ name: req.params.name });
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
router.get("/:id", getComponentByID, (req, res) => {
  res.json(res.component);
});

router.get("/name/:name", getComponentByName, (req, res) => {
  if (req.params.name == null) {
    res.json({ message: "Component name is required" });
  }
  res.json(res.component);
});

// Create a new component
router.post("/", async (req, res) => {
  const component = new Component({
    name: req.body.name,
    description: req.body.description,
    examples: req.body.examples,
    properties: req.body.properties,
    files: req.body.files,
  });

  try {
    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a component
router.patch("/:id", getComponentByID, async (req, res) => {
  if (req.body.name != null) {
    res.component.name = req.body.name;
  }
  if (req.body.description != null) {
    res.component.description = req.body.description;
  }
  if (req.body.examples != null) {
    res.component.examples = req.body.examples;
  }
  if (req.body.properties != null) {
    res.component.properties = req.body.properties;
  }
  if (req.body.files != null) {
    res.component.files = req.body.files;
  }

  try {
    const updatedComponent = await res.component.save();
    res.json(updatedComponent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a component
router.delete("/:id", getComponentByID, async (req, res) => {
  try {
    await res.component.deleteOne();
    res.json({ message: "Component deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
