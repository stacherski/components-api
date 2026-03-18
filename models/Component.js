const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: true },
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
    type: String,
    required: true,
  },
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
