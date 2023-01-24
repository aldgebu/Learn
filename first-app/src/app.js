const express = require('express');
const Controller = require('./api/controller/controller');
const Database = require('./infrastructure/database/database');
const UserValidator = require('./api/middleware/user-validator');
const JwtAuthorization = require('./api/middleware/jwt-authorization');

const app = express();
const controller = new Controller;
const userValidator = new UserValidator();
const jwtAuthorization = new JwtAuthorization();

Database.connectDataBase();
app.use(express.json());

app.post('/registration', userValidator.isValid.bind(userValidator), async (req, res) => {
    await controller.registration(req, res);
});

app.post('/login', userValidator.validForLogin.bind(userValidator), async(req, res) => {
    await controller.login(req, res);
})
app.get('/user', async (req, res) => {
    await controller.userWithProperty(req, res);
})
app.put('/update', jwtAuthorization.haveToken.bind(jwtAuthorization), async (req, res) => {
    await controller.updateUserInfo(req, res);
})


app.listen(5000);