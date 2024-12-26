const mongoose = require("mongoose");
const Todo = mongoose.model('Todo', new mongoose.Schema({
  text: { type: String, required: true },
  editing: { type: Boolean, default: false },
}));
module.exports = Todo;
