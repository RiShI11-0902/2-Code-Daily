require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require('cookie-parser');

const connect = require("./dbConfig");
const session = require("express-session");
const { initializingPassport } = require("./passportConfig");
const passport = require("passport");

const problemRoute = require("./routes/problemRoutes");
const interviewRoute = require("./routes/interviewRoute");

const authRoute = require("./routes/auth");
const paymentRoute = require("./routes/paymentRoute");
const userRoute = require("./routes/user");

const allowedOrigins = [
  "https://leetcode.com",
  "https://2codedaily.com",
   "https://leetcode.com",
  "https://2codedaily.com",
  "https://www.linkedin.com",
  "https://www.naukri.com",
  "https://www.indeed.com",
  "https://wellfound.com",
  "https://www.glassdoor.com"
];

connect();
app.use(express.json());
app.use(cookieParser())

initializingPassport(passport);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS")); // Reject the request
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(
  session({
    secret: "ejf935u849itjier",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true, // only over HTTPS
      sameSite: "None", // allow cross-origin
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/api", problemRoute);
app.use("/create", interviewRoute)
app.use("/userpayment", paymentRoute);

app.listen(5000);
