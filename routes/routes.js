var middleware = require('./middleware');
var UserController = require('../controllers/UserController');
var ProjectController = require('../controllers/ProjectController');
var TaskController = require('../controllers/TaskController');
var TimerController = require('../controllers/TimerController');

module.exports = function (router) {

    router.get('/', function (req, res) { res.send("Hello world"); });
    router.post('/login', UserController.login);


    //User CRUD
    router.post('/user', UserController.create);
    router.get('/users', middleware, UserController.list);
    router.get('/user/:username', middleware, UserController.find);
    router.put('/user/', middleware, UserController.updateById);
    router.delete('/user/', middleware, UserController.delete);


    //Project CRUD
    router.post('/project', middleware, ProjectController.create);
    router.get('/projects', middleware, ProjectController.list);
    router.get('/project/:id', middleware, ProjectController.find);
    router.put('/project/', middleware, ProjectController.updateById);
    router.delete('/project/', middleware, ProjectController.delete);


    //Task CRUD
    router.post('/task', middleware, TaskController.create);
    router.get('/tasks', middleware, TaskController.list);
    router.get('/task/:id', middleware, TaskController.find);
    router.put('/task/', middleware, TaskController.updateById);
    router.delete('/task/', middleware, TaskController.delete);    
    

    //Timer CRUD
    router.post('/timer', middleware, TimerController.create);
    router.get('/timers', middleware, TimerController.list);
    router.get('/timer/:id', middleware, TimerController.find);
    router.put('/timer/', middleware, TimerController.updateById);
    router.delete('/timer/', middleware, TimerController.delete);
}
