const Transaction = require('../models/transactions');
const transactionController = {};
const mysqlConnection = require('../database');

transactionController.getTransactions = (req, res) => {
    mysqlConnection.query('SELECT * FROM transactions;', (err, transactions) => {
        if (err) {
            res.json(err);
        }
        res.json(transactions);

    })

};

transactionController.getFiltrerTransactions = (req, res) => {
    mysqlConnection.query('SELECT * FROM transactions;', (err, transactions) => {
        if (err) {
            res.json(err);
        }
        res.json(transactions);
    })
};

transactionController.getTransactionByUsers = (req, res) => {
    mysqlConnection.query("SELECT transaction_number,item_number,account_number,spent_date,spent_balance,description FROM transactions,account WHERE transactions.account_number=account.account_number AND identification=" + req.params.id + ";", (err, transactions) => {
        if (err) {
            res.json(err);
        }
        res.json(transactions);
    })
};

transactionController.createTransaction = (req, res) => {
    const transactions = new Transaction(req.body);
    res.json('recibido');
    let instrucQuery = "INSERT INTO transactions VALUES (DEFAULT," + transactions.item_number + "," + transactions.account_number + ", CURRENT_DATE" + "," + transactions.spent_balance + ",'" + transactions.description + "');";
    mysqlConnection.query(instrucQuery, (err, transactions) => {
        console.log(transactions);
    })
};

transactionController.updateTransaction = (req, res) => {
    const id = req.params.id;
    const newTransaction = req.body;
    let instrucQuery = "UPDATE transactions SET  spent_date='" + newTransaction.spent_date + "', spent_balance=" + newTransaction.spent_balance + " WHERE transaction_number =" + id + ";";
    mysqlConnection.query(instrucQuery, (err, transaction) => {
        console.log(transaction);
    })
};

transactionController.deleteTransaction = (req, res) => {
    const id = req.params.id;
    let instrucQuery = "DELETE FROM transactions WHERE transaction_number=" + id + ";";
    mysqlConnection.query(instrucQuery, (err, users) => {
        res.redirect('/');
    })
};

module.exports = transactionController;