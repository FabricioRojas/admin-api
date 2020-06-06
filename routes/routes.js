var middleware = require('./middleware');
var UserController = require('../controllers/UserController');

module.exports = function (router) {

    router.get('/', function (req, res) { res.send("Hello world"); });

    router.get('/nope', middleware, function (req, res) {
        res.send("Yep");
    });

    //User CRUD
    router.get('/users', UserController.list);
    router.post('/user', UserController.create);
    router.get('/user/:id', UserController.find);
    router.put('/user/updatebyid', UserController.updateById);
    router.delete('/user/delete', UserController.delete);
}