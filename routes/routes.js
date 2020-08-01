var middleware = require('./middleware');
var UserController = require('../controllers/UserController');
var ProjectController = require('../controllers/ProjectController');
var TaskController = require('../controllers/TaskController');
var TimerController = require('../controllers/TimerController');
var RoleController = require('../controllers/RoleController');

const dotenv = require('dotenv');
dotenv.config();

module.exports = function (router) {
    
    router.get('/', function (req, res) { res.send(process.env.NODE_ENV == 'development' ? "Hello world" : "API v0.0.2"); });
    router.post('/login', UserController.login);


    //Role CRUD
    router.post('/role', middleware(), RoleController.create);
    router.get('/roles', middleware(), RoleController.list);
    router.get('/role/:id', middleware(), RoleController.find);
    router.put('/role', middleware(), RoleController.updateById);
    router.delete('/role', middleware(), RoleController.delete);


    //User CRUD
    router.post('/user', UserController.create);
    router.get('/users', middleware("user"), UserController.list);
    router.get('/user/:username', middleware(), UserController.find);
    router.put('/user/', middleware(), UserController.updateById);
    router.delete('/user', middleware(), UserController.delete);


    //Project CRUD
    router.post('/project', middleware(), ProjectController.create);
    router.get('/projects', middleware(), ProjectController.list);
    router.get('/project/:id', middleware(), ProjectController.find);
    router.put('/project', middleware(), ProjectController.updateById);
    router.delete('/project', middleware(), ProjectController.delete);


    //Task CRUD
    router.post('/task', middleware(), TaskController.create);
    router.get('/tasks', middleware(), TaskController.list);
    router.get('/task/:id', middleware(), TaskController.find);
    router.put('/task', middleware(), TaskController.updateById);
    router.delete('/task', middleware(), TaskController.delete);    
    

    //Timer CRUD
    router.post('/timer', middleware(), TimerController.create);
    router.get('/timers', middleware(), TimerController.list);
    router.get('/timer/:id', middleware(), TimerController.find);
    router.put('/timer', middleware(), TimerController.updateById);
    router.delete('/timer', middleware(), TimerController.delete);
}
