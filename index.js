var express = require('express');
// var mongoose = require('mongoose');
var app = express();


// mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
//    if (err) throw err;
//    console.log('Connected');
   app.listen(process.env.PORT || 3000);
// });

app.get('/', function (req, res) {
    res.send('Hello world');
});

module.exports = app;
