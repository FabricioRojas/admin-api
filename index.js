var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var routes = require('./routes/routes');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

// mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
//    if (err) throw err;
//    console.log('Connected');
// });

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto', port)
});

module.exports = app;
