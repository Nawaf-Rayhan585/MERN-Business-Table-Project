// Basic Lib Import
const express =require('express');
const mongoose =require('mongoose');
const bodyParser=require('body-parser')
const router =require('./src/routes/api');
const app= new express();






const path= require('path')


// Security Middleware Lib Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize =require('express-mongo-sanitize');
const xss =require('xss-clean');
const hpp =require('hpp');
const cors =require('cors');

// Database Lib Import

app.use(express.static('client/build'));

// Security Middleware Implement
app.use(cors())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

// Body Parser Implement
app.use(bodyParser.json())

// Request Rate Limit
const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)


let URL="Your Database Connection URL"
mongoose.connect(URL).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})

// Routing Implement
app.use("/api/v1",router)

// Add React Front End Routing
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})

module.exports=app;
















