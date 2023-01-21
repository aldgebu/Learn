const express = require('express');
const Controller = require('./controller/controller');
const Database = require('./data-base/database');

const app = express();
const controller = new Controller;

Database.connectDataBase();
app.use(express.json());

app.post('/registration', async (req, res) => {
    const result = await controller.registration(req.body);
    if (result){
        res.send('Registration complited succesfuly!');
    }else{
        res.send('This email is already taken');
    }
})



app.listen(3000);