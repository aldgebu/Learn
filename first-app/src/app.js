const express = require('express');
const UserController = require('./api/controller/controller');
const Database = require('./infrastructure/database/database');
const UserValidator = require('./api/middleware/user-validator');
const Authorization = require('./api/middleware/authorization');

const app = express();
const userController = new UserController;
const userValidator = new UserValidator();
const authorization = new Authorization();

Database.connectDataBase();
app.use(express.json());

app.post('/registration', userValidator.isValid.bind(userValidator), async (req, res) => {
    await userController.registration(req, res);
});

app.post('/login', userValidator.validForLogin.bind(userValidator), async(req, res) => {
    await userController.login(req, res);
});

app.get('/user', async (req, res) => {
    await userController.getUserWithProperty(req, res);
});

app.put('/update', authorization.isValid.bind(authorization), async (req, res) => {
    await userController.updateUserFields(req, res);
});

app.listen(5000);