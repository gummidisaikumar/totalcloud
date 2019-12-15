// app.js
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const timeLineRoutes = require('./routes/timeLine');

mongoose.connect('mongodb+srv://gummidi78:mongoDB@123@gummidi-wk21w.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
});

app.use(morgan('dev'));
app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/timeline', timeLineRoutes);
//app.use('/timeline', timeLineRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status= 404;
    next(error); 
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message,
        }
    })
});


module.exports = app;