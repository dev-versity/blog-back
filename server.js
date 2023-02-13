const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blogdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

const articleRouter = require("./routes/articleRoute");
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


app.use(express.urlencoded({ extended: true}))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
