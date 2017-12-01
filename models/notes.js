// Require dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new noteSchema
const noteSchema = new Schema({
  title: String,
  body: String
});

// Create Notes model
const Notes = mongoose.model("Notes", noteSchema);

// Export model
module.exports = Notes;
