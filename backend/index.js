require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const connect = require('./dbConfig')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { initializingPassport } = require("./passportConfig")
const passport = require('passport')

const problemRoute = require("./routes/problemRoutes")
const userRoute = require("./routes/user")
const paymentRoute = require("./routes/paymentRoute")

const allowedOrigins = [
    "https://leetcode.com",
    "http://localhost:5173",
]

connect()

initializingPassport(passport)
app.use(cors({
    origin: (origin,callback)=>{
        console.log("Request Origin:", origin); // Log the origin
        if(!origin ||allowedOrigins.includes(origin)){
            callback(null, true); 
        }else {
            callback(new Error("Not allowed by CORS")); // Reject the request
        }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))
app.use(express.json())
// app.use(cookieParser())
app.use(session({
    secret:"ejf935u849itjier",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/auth", userRoute )
app.use("/api", problemRoute )
app.use("/user", paymentRoute )

app.listen(5000)