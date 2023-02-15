const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('../models/User');

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
const params = {
    secretOrKey:'SimplonCreteil',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
    const strategy = new Strategy(params, async (payload, done) => {
    const user = await User.findOne(payload.id)
    if (!user) return done(new Error('user not found'), null);
    return done (null,user);
    })
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate('jwt',{session:false})
        }
    }
}
