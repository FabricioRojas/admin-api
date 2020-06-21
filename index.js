const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

mongoose.connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`, function (err) {
   if (err) throw err;
   console.log('Connected to DB');
});

app.listen(port, () => {
    console.log('*---------------------------------------------------------------------*');
    console.log('|---------------------------------------------------------------------|');
    console.log(`|---- Servidor iniciado en el puerto '${port}' en modo '${process.env.NODE_ENV}' ----|`);
    console.log('|---------------------------------------------------------------------|');
    console.log('*---------------------------------------------------------------------*');
});

module.exports = app;
