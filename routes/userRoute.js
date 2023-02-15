const userRouter = require("express").Router();
const User = require("../models/User")
const config = require("../config")
const jwt = require("jwt-simple")
userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.post('/signup', async (req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.password = await newUser.encryptPassword(req.body.password);
    newUser.save((error, user) => {
    if ( error ) res.send(error)
    const token = jwt.encode({id:user.id}, config.secret)
    res.send({user, token });
  });
})

userRouter.get('/signin', (req, res) => {
    res.render('signin')
})

userRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email}).select('+password');
    const validPassword = await user.validatePassword(password, user.password);
    if (!validPassword) {
        const error = new Error('wrong credentials')
        res.send(error)
    }
    return res.send('Bravo! You are connected')
})

module.exports = userRouter;