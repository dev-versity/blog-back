const Article       = require("../models/Article");
const articleRouter = require("express").Router();



articleRouter.get("/all", (req, res) => {
  Article.find({}, (err, articles) => {
    if ( err ) res.send(err);
    res.render("allArticles", {articles: articles});
  })
});
 



articleRouter.get("/create", (req, res) => {
  res.render("create")
})


articleRouter.post("/create", (req, res) => {
  let newArticle = new Article(req.body);
  newArticle.save((error, article) => {
    if ( error ) res.send(error)
    res.redirect("/articles/all");
  });
})




articleRouter.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if ( err ) res.send(err)
    res.render("article", {article: article});
  })
})


articleRouter.get("/:id/edit", (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if ( err ) res.send(err)
    res.render("edit", {article: article});
  })
})







articleRouter.post("/:id/edit", (req, res) => {
  Article.findByIdAndUpdate(req.params.id, req.body, (err, article) => {
    console.log(req.body)
    if (err) {
      res.send(err)
    } else {
      res.redirect(`/articles/${article.id}`);
    }
  })
});




articleRouter.delete("/:id", (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err, article) => {
    if ( err ) res.send(err)
    res.send({message: "Article supprimé avec succès"})
  })
});




module.exports = articleRouter;
