const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  properties: {
    type: [Object],
    required: true,
  },
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
