const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  description: String,
  content: String,
  user: {type: Schema.Types.ObjectId, ref: "User"}

});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
