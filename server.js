const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

const articleRouter = require("./routes/articleRoute");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/articles", articleRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
