var middleware = require('./middleware');
var UserController = require('../controllers/UserController');

module.exports = function (router) {

    router.get('/', function (req, res) { res.send("Hello world"); });

    router.get('/nope', middleware, function (req, res) {
        res.send("Yep");
    });

    router.post('/user', UserController.createUser);
}