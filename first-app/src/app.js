const express = require('express');
const Controller = require('./controller/controller');
const Database = require('./database/database');

const app = express();
const controller = new Controller;

Database.connectDataBase();
app.use(express.json());

app.post('/registration', async (req, res) => {
    await controller.registration(req, res);
})

app.listen(3000);