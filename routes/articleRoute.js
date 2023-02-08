const articleRouter = require("express").Router();

articleRouter.get("/all", (req, res) => {
  res.send("Hello Article!");
});

// CRUD articleRoute



module.exports = articleRouter;
