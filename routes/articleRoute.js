const Article = require("../models/Article");
const articleRouter = require("express").Router();

articleRouter.get("/all", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      res.send(err);
    } else {
      res.send(articles);
    }
  })
});

articleRouter.post("/create", (req, res) => {
  let newArticle = new Article(req.body);
  newArticle.save((error, article) => {
    if (error) {
      res.send(error);
    } else {
      res.send(article);
    }
  });
})



module.exports = articleRouter;
