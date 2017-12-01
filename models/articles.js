// Require dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new articleSchema object
const articleSchema = new Schema({
  Headline: {
    type: String,
    required: true
  },
  Summary: {
    type: String,
    required: true
  },
  URL: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Saved: Boolean,
  Note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// Create a model from the schema
const Articles = mongoose.model("Articles", articleSchema);

// Export the model
module.exports = Articles;
