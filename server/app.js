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

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

main();

const sessionOptions = {
  secret: 'hiddenemailkey',
  resave: false,
  saveUninitialized: true, 
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === 'production', // Enable for HTTPS in production
    httpOnly: true,
  },
};

app.use(cors({
  origin: 'http://localhost:5173', // Adjust as needed
  credentials: true,
}));

// Apply middleware in a logical order
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Ensure cookieParser is used
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


// passport.use('local', new LocalStrategy(
//   { usernameField: 'username', passwordField: 'password' },
//   async (username, password, done) => {
//     try {
//       // Authenticate user using User.authenticate()
//       const user = await User.authenticate(username, password);

//       // If user is not found or authentication fails
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username or password.' });
//       }

//       // If user is not verified
//       if (!user.verified) {
//         return done(null, false, { message: 'User is not verified.' });
//       }

//       // If user is found and authentication is successful, print user and return user
//       console.log('User authenticated:', user);
//       return done(null, user);
//     } catch (error) {
//       // If an error occurs during authentication, pass it to the done callback
//       return done(error);
//     }
//   }
// ));

passport.use('local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (username, password, done) => {
    try {
      const user = await User.authenticate(username, password);

      if (!user) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      // ... other verification checks as needed
      if (!user.verified) {
        return done(null, false, { message: 'User is not verified.' });
      }

      // If user is authenticated, **move the log statement here inside the callback:**
      console.log('User authenticated:', user);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));



passport.serializeUser((user, done) => {
  done(null, { id: user.id});
});

passport.deserializeUser((data, done) => {
    User.findById(data.id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});


// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.isAuthenticated()); // Check if user is authenticated
//     next();
// });

app.post('/auth/user', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const newUser = new User({
            email: email,
            verified: false,
            username: username
        });

        const registeredUser = await User.register(newUser, password);
        //  console.log(registeredUser);
         req.login(registeredUser, (err) => {
          if (err) {
              console.error('Error logging in:', err);
              res.status(500).send({ message: "Internal Server Error" });
              return;
          }

          // At this point, the user is logged in, and req.user should be populated
          console.log('inside login');
          // console.info(req.user);
          res.redirect("http://localhost:8080/auth/home");
          // Redirect to another route where you can access req.user
          
      });


      

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
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

app.get('/user/verify/:token', async (req, res) => {
  const token = req.params.token;

  try {
    const tokenDoc = await Token.findOne({ token: token });
    // ... other verification logic and user update

    const userget = await User.findOneAndUpdate(
      { _id: tokenDoc.userId },
      { $set: { verified: true } },
      { new: true }
  );

  if (!userget) {
      console.log("User not found");
      const msg = encodeURIComponent('Internal Server Error');
      return res.redirect(`/error?code=500&msg=${msg}`);
  }

   
  Token.deleteOne({ _id: tokenDoc._id})
  .then(() => {
    console.log("Token deleted");
  })
  .catch((err) => {
    console.log("Error deleting token:", err);
    // Handle token deletion error appropriately (e.g., log or redirect to error page)
  })
  .finally(() => {
    // Redirect to the desired page after login and token deletion
    res.redirect('http://localhost:5173/weather');
  });
    
  } catch (error) {
      console.log("Error verifying user:", error);
      const msg = encodeURIComponent('Internal Server Error');
      return res.redirect(`/error?code=500&msg=${msg}`);
  }
});


// app.get('/del/:token', (req,res)=>{
//   const id = req.params.token;

//   Token.deleteOne({ _id: id})
//   .then(() => {
//     console.log("Token deleted");
//   })
//   .catch((err) => {
//     console.log("Error deleting token:", err);
//     // Handle token deletion error appropriately (e.g., log or redirect to error page)
//   })
//   .finally(() => {
//     // Redirect to the desired page after login and token deletion
//     res.redirect('http://localhost:5173/weather');
//   });
// });




app.get('/status', isLogged, async (req,res) => {
//     const {email, pass} = req.body;
    
//   User.find({username : email})
//   .then((users) => {

//     if(users.length > 0){

//         for(const user of users){
//             if(user.id == req.user.id){
//                 user.verified == true ? res.status(202).send({message : true}) : res.status(404).send({message : false});
//             }
//         }
//     }
//   })

 console.log(req.isAuthenticated());
 console.log(req.user);
 console.dir(req.session);

  //  const result = req.isAuthenticated();
  //  if(result){
  //   console.log(req.user);
  //   res.status(205).send({message : 'OK'});
  //  }else{
  //   res.status(405).send({message : 'FAILED'});
  //  }
   
});

app.get('/logout', async (req, res) => {
    
  await User.findOneAndUpdate(
          { _id: req.user._id },
          { $set: { verified: false } },
          { new: true }
        )
        .then(()=>{
          console.log("user log out");

          req.logout(function(err) {
            if (err) {
                console.log(req.isAuthenticated());
              console.error('Error logging out:', err);
              res.status(500).send({message : "Error Occured During Logging Out"});
              // Handle error if needed
            }
            // Redirect the user to a desired location after logout (e.g., home page)
            // res.redirect('/');
        })
        console.log(req.user);
        res.redirect('http://localhost:5173/');

        })
        .catch((e)=>{
          console.log(e);
        }); 
  // Call the logout() function provided by Passport to clear the login session
    
  });

app.get('/fetch/:location', async (req,res) => {
  // if(req.session.status) console.log("yes found");
    // console.log('inside route');
    
      const location = req.params.location;
     console.log(location)
      
     await getCondition(location)
     .then((condition) => {
      console.log(condition);
        res.json(condition);
     })
     .catch((err) => {
        console.log(err);
     });

    //  res.json(location);
});

app.get('/:lat/:lng', async(req,res) => {
     const lat = req.params.lat;
     const lng = req.params.lng;

     await getWeather(lat, lng)
     .then((condition) => {
        res.json(condition);
     })
     .catch((err) => {
        console.log(err);
     });
     
});

app.get('/error', (req,res) => {
    const code = req.query.code;
    const msg = req.query.msg;
    console.log(code,msg)
});

app.listen(8080, () => {
    console.log('server running at 8080 port')
});