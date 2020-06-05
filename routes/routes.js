var middleware = require('./middleware');

module.exports = function (router) {

    router.get('/', function (req, res) { res.send("Hello world"); })

    router.get('/nope', middleware, function (req, res) {
        res.send("Yep");
    });
}