import express from 'express';
const app = express();
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import sendEmail from './public/js/sendEmail.js';
import User from './models/user.js';
import Token from './models/token.js';
import isLogged from './public/js/isLogged.js';
import cors from 'cors';
import getCondition from './public/js/getCondition.js';
import getWeather from './public/js/currCondition.js';
import bodyParser from 'body-parser';

const MONGO_URL = "mongodb://127.0.0.1:27017/techvista";


async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
   .then(() => {
    console.log("connected to DB!");
   })
   .catch((err) => {
    console.log(err);
   });

app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const sessionOptions = {
//     secret: 'mysupersecret#123555',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//       httpOnly: true,
//       secure : true,
//     },
// };

// app.use(session(sessionOptions));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((use, done) => {
    User.findById(use.id, (err, user) => {
        done(err, user);
    });
});

app.use((req, res, next) => {
    // console.log('user', req.session.userid);
    console.log(req.user);
    next();
});

// app.post('/auth/user', async (req, res) => {
//     const { email, username, password } = req.body;

//     try {
//         const newUser = new User({
//             username: username,
//             email: email,
//             verified: false
//         });

//         const registeredUser = await User.register(newUser, password);

//         const newToken = new Token({
//             username: email,
//             userId: registeredUser.id,
//             token: crypto.randomBytes(32).toString('hex')
//         });

//         await newToken.save();

//         const url = `http://localhost:8080/user/verify/${newToken.token}`;

//         await sendEmail('Verification Link', email, 'verify to login', 'OK', url);
        
//         res.status(200).send({ message: "An email has been sent for verification" });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ message: "Internal Server Error" });
//     }
// });

// app.get('/user/verify/:token', async (req, res) => {
//   const token = req.params.token;

//   try {
//       const tokenDoc = await Token.findOne({ token: token });
//       if (!tokenDoc) {
//           console.log("Token not found");
//           const msg = encodeURIComponent('Invalid Link');
//           return res.redirect(`/error?code=400&msg=${msg}`);
//       }

//       const userget = await User.findOneAndUpdate(
//           { _id: tokenDoc.userId },
//           { $set: { verified: true } },
//           { new: true }
//       );

//       if (!userget) {
//           console.log("User not found");
//           const msg = encodeURIComponent('Internal Server Error');
//           return res.redirect(`/error?code=500&msg=${msg}`);
//       }

//       req.login(userget, function(err) {
//           if (err) { 
//               console.log("Error logging in:", err);
//               const msg = encodeURIComponent('Internal Server Error');
//               return res.redirect(`/error?code=500&msg=${msg}`);
//           }
          
//           Token.deleteOne({ _id: tokenDoc._id })
//               .then(() => {
//                   console.log("Token deleted");
//                   req.session.userget = req.user._id;
//                   console.log(req.user);
//                   res.redirect('http://localhost:5173/weather');
//               })
//               .catch((err) => {
//                   console.log("Error deleting token:", err);
//                   const msg = encodeURIComponent('Internal Server Error');
//                   return res.redirect(`/error?code=500&msg=${msg}`);
//               });
//       });
//   } catch (error) {
//       console.log("Error verifying user:", error);
//       const msg = encodeURIComponent('Internal Server Error');
//       return res.redirect(`/error?code=500&msg=${msg}`);
//   }
// });


app.post('/auth/user', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const newUser = new User({
            email: email,
            verified: false,
            username: username
        });

        await User.register(newUser, password);

        // After successful registration, log in the user
        passport.authenticate('local')(req, res, () => {
            // Redirect to the home page after successful login
            res.redirect("http://localhost:8080/auth/home");
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }


        
    //      req.login(registeredUser, (err) => {
    //       if (err) {
    //           console.error('Error logging in:', err);
    //           res.status(500).send({ message: "Internal Server Error" });
    //           return;
    //       }

    //       // At this point, the user is logged in, and req.user should be populated
    //       console.log('inside login');
    //       // console.info(req.user);
    //       res.redirect("http://localhost:8080/auth/home");
    //       // Redirect to another route where you can access req.user
          
    //   });
});

app.get('/auth/home', (req,res)=>{
  const user = req.user;

  // const newToken = new Token({
  //   username: user.email,
  //   userId: user._id,
  //   token: crypto.randomBytes(32).toString('hex')
  //     });

  //     await newToken.save();

  //     const url = `http://localhost:8080/user/verify/${newToken.token}`;

  //     await sendEmail('Verification Link', email, 'verify to login', 'OK', url)
  //     .then(()=>{
  //       res.status(200).send({ message: "An email has been sent for verification" });
  //     })
  //     .catch(()=>{
  //       res.status(500).send({ message: "Internal server error email" });
  //     })
      // console.log(req.session.passport.user);
      console.log(req.user);
});

app.listen(8080, () => {
    console.log('server running at 8080 port')
});