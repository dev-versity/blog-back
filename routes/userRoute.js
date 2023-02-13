const userRouter = require("express").Router();
const User = require("../models/User")

userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.post('/signup', (req, res) => {
    let newUser = new User(req.body);
  newUser.save((error, user) => {
    if ( error ) res.send(error)
    res.send(user);
  });
})

module.exports = userRouter;