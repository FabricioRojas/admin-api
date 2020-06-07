var middleware = require('./middleware');
var UserController = require('../controllers/UserController');

module.exports = function (router) {

    router.get('/', function (req, res) { res.send("Hello world"); })

    router.post('/login', UserController.login);

    //User CRUD
    router.post('/user', UserController.create)
    router.get('/users', middleware, UserController.list);
    router.get('/user/:username', middleware, UserController.find);;
    router.put('/user/updatebyid', middleware, UserController.updateById);
    router.delete('/user/delete', middleware, UserController.delete);
}
