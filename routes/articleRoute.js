const Article       = require("../models/Article");
const articleRouter = require("express").Router();

articleRouter.get("/all", (req, res) => {
  Article.find({}, (err, articles) => {
    if ( err ) res.send(err);
    res.render("allArticles", {articles: articles});
  })
});

articleRouter.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if ( err ) res.send(err)
    res.send(article)
  })
})

articleRouter.put("/:id", (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err, article) => {
    console.log(req.body)
    if (err) {
      res.send(err)
    } else {
      res.send(article)
    }
  })
});

articleRouter.delete("/:id", (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err, article) => {
    if ( err ) res.send(err)
    res.send({message: "Article supprimé avec succès"})
  })
});

articleRouter.post("/create", (req, res) => {
  let newArticle = new Article(req.body);
  newArticle.save((error, article) => {
    if ( error ) res.send(error)
    res.send(article);
  });
})


module.exports = articleRouter;
