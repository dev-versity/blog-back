const userRouter = require("express").Router();
const User = require("../models/User")

userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.post('/signup', async (req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.encryptPassword(req.body.password);
    newUser.save((error, user) => {
    if ( error ) res.send(error)
    res.send(user);
  });
})

module.exports = userRouter;