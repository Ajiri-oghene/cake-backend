const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const categoryRoutes = require('./api/routes/category');
const userRoutes = require('./api/routes/users');


dotenv.config();
const api = process.env.API_URL;
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DBConnection is successful!"))
    .catch((err) => {
        console.log(err);
    });


//Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.set('doc');
app.use('/upload', express.static(__dirname + '/upload'));

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

//Routes to handle request
app.use(`${api}/category`, categoryRoutes);
app.use(`${api}/users`, userRoutes);

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error. status = 404;
    next(error) 
});

app.use((error,req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message 
        }
    })
})

    module.exports = app;