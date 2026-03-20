const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    default: { type: mongoose.Schema.Types.Mixed },
    description: { type: String },
    propertyType: { type: String },
    optional: { type: String, required: true },
  },
  { _id: false },
);

const EventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    exampleValue: { type: String },
    description: { type: String },
  },
  { _id: false },
);

const ExampleSchema = new mongoose.Schema(
  {
    example: { type: String, required: true },
    code: { type: String, required: true },
  },
  { _id: false },
);

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  properties: { type: [PropertySchema], default: [], required: false },
  events: { type: [EventSchema], default: [], required: false },
  examples: { type: [ExampleSchema], default: [], required: false },
});

const Component = mongoose.model("Component", componentSchema);

module.exports = Component;
