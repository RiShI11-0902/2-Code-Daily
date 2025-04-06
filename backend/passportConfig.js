// const { User } = require("./models/user");

const User = require("./models/user");

const OAuth2Strategy = require("passport-google-oauth20").Strategy;

exports.initializingPassport = (passport) =>{
    passport.use(new OAuth2Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SEC,
        callbackURL: 'https://two-code-daily-1.onrender.com/auth/google/callback',
        scope:["profile","email"]
    }, async (accessToken, refreshToken,profile,done)=>{
        try {
            let user = await User.findOne({googleId:profile.id});
            if (!user){
                user = new User({
                    googleId:profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image:profile.photos[0].value,
                })

                await user.save();
            } 

            return done(null,user);
        } catch (error) {
            return done(error,null)
        }
    }) )

    
passport.serializeUser( (user,done)=>{
    done(null,user.id)
})

passport.deserializeUser( async (id,done)=>{
    try {
        const user = await User.findById(id); // Fetch the user by ID
        done(null, user); // Attach the user to req.user
    } catch (error) {
        done(error, null);
    }
})

}