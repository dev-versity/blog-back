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
        throw error
    }
    return res.send('Bravo! You are connected')
})

module.exports = userRouter;