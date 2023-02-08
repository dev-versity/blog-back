const articleRouter = require("express").Router();

articleRouter.get("/", (req, res) => {
  res.send("Hello Article!");
});

module.exports = articleRouter;
