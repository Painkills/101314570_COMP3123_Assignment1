const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const cors = require('cors')

const DB_URL = "mongodb+srv://d4tich:get.me.in@cluster0.qibcjdv.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
const PORT_NUM = process.env.PORT || 8081
const path = __dirname + '/views/';
const app = express();

app.use(cors({ credentials: true, origin: '*', optionSuccessStatus: 200,}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/api", userRoutes)
app.use("/api/emp", employeeRoutes)
app.use(express.static(path));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", ["GET", "POST", "OPTIONS", "PUT", "DELETE"]);
    next();
});

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(PORT_NUM, () => {
    console.log("Server is listening on port", PORT_NUM);
});