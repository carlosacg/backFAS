const Item = require('../models/item');
const itemController = {};
const mysqlConnection = require('../database');

itemController.getItems = (req, res) => {
    mysqlConnection.query('SELECT * FROM item;', (err, items) => {
        if (err) {
            res.json(err);
        }
        res.json(items);
    })
};

itemController.getItemByUser = (req, res) => {
    mysqlConnection.query("SELECT item_number,budget_number,planned_balance,spent_balance,description FROM item NATURAL JOIN budget WHERE identification=" + req.params.id + ";", (err, items) => {
        if (err) {
            res.json(err);
        }
        res.json(items);
    })
};

itemController.createItem = (req, res) => {
    const item = new Item(req.body);
    res.json('recibido');
    console.log(item);
    let instrucQuery = "INSERT INTO item VALUES (DEFAULT," + item.budget_number + "," + item.planned_balance + "," + item.spent_balance + ",'" + item.description + "');";
    console.log(instrucQuery);
    mysqlConnection.query(instrucQuery, (err, users) => {
        console.log(users);
    })
};

itemController.updateItem = (req, res) => {
    const id = req.params.id;
    const newItem = req.body;
    let instrucQuery = "UPDATE item SET budget_number=" + newItem.budget_number + ", planned_balance=" + newItem.planned_balance + ", spent_balance=" + newItem.spent_balance + ", description='" + newItem.description + "' WHERE item_number =" + id + ";";
    mysqlConnection.query(instrucQuery, (err, users) => {
        console.log(users);
    })
};

itemController.deleteItem = (req, res) => {
    const id = req.params.id;
    let instrucQuery = "DELETE FROM item WHERE item_number=" + id + ";";
    mysqlConnection.query(instrucQuery, (err, users) => {
        res.redirect('/');
    })
};

module.exports = itemController;