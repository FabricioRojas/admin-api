var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/routes');
const cors = require('cors');
var port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

mongoose.connect('mongodb://localhost/task_manager', function (err) {
   if (err) throw err;
   console.log('Connected to DB');
});

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto', port);
});

module.exports = app;
