const User = require('../models/user');
const mysqlConnection = require('../database');
const userController = {};

userController.getUsers = (req, res) => {
    mysqlConnection.query('SELECT * FROM users;', (err, users) => {
        if (err) {
            res.json(err);
        }
        res.json(users);
    })
};

userController.getEspecifyUser = (req, res) => {
    mysqlConnection.query("SELECT * FROM users WHERE identification=" + req.params.id + ";", (err, users) => {
        if (err) {
            res.json(err);
        }
        res.json(users);
    })
};

userController.createUser = (req, res) => {
    const user = new User(req.body);
    res.json('recibido');
    let instrucQuery = "INSERT INTO users VALUES (" + user.identification + ",'" + user.user_name + "','" + user.last_name + "','" + user.email + "','" + user.picture + "');";
    mysqlConnection.query(instrucQuery, (err, users) => {
        console.log(users);
    })
};

userController.updateUser = (req, res) => {
    const id = req.params.id;
    const newUser = req.body;
    let instrucQuery = "UPDATE users SET user_name='" + newUser.user_name + "', last_name='" + newUser.last_name + "', email='" + newUser.email + "', pass='" + newUser.pass + "', picture='" + newUser.picture + "' WHERE identification =" + id + ";";
    mysqlConnection.query(instrucQuery, (err, users) => {
        console.log(users);
    })
};

userController.deleteUser = (req, res) => {
    const id = req.params.id;
    let instrucQuery = "DELETE FROM users WHERE identification=" + id + ";";
    mysqlConnection.query(instrucQuery, (err, users) => {
        res.redirect('/');
    })
};

module.exports = userController;