//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Transaction = require('../models/transactions');
const transactionController={};
const mysqlConnection = require('../database');

transactionController.getTransactions=(req,res)=>{//LISTA LOS DATOS

    mysqlConnection.query('SELECT * FROM transactions;',(err,transactions)=>{
        if(err){
            res.json(err);
        }
        res.json(transactions);
       
    })

};
transactionController.getFiltrerTransactions=(req,res)=>{//LISTA LOS DATOS

    mysqlConnection.query('SELECT * FROM transactions;',(err,transactions)=>{
        if(err){
            res.json(err);
        }
        res.json(transactions);
       
    })
};

transactionController.getEspecifyTransaction=(req,res)=>{//LISTA LOS DATOS
    mysqlConnection.query("SELECT * FROM transactions WHERE transaction_number="+req.params.id+";",(err,transactions)=>{
        if(err){
            res.json(err);
        }
        res.json(transactions);
       
    })
};

transactionController.getTransactionByUsers=(req,res)=>{//LISTA LOS DATOS
    mysqlConnection.query("SELECT transaction_number,item_number,account_number,spent_date,spent_balance,description FROM transactions,account WHERE transactions.account_number=account.account_number AND identification="+req.params.id+";",(err,transactions)=>{
        if(err){
            res.json(err);
        }
        res.json(transactions);
       
    })
};


transactionController.createTransaction=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const transactions = new Transaction(req.body);
    console.log(transactions);
    res.json('recibido');
    
    let instrucQuery="INSERT INTO transactions VALUES (DEFAULT,"+transactions.item_number+","+transactions.account_number+", CURRENT_DATE"+","+transactions.spent_balance+ ",'"+transactions.description  +"');";

    mysqlConnection.query(instrucQuery,(err,transactions)=>{
        console.log(transactions);
    })
};

transactionController.updateTransaction=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newTransaction = req.body;
    console.log(newTransaction);

    let instrucQuery="UPDATE transactions SET  spent_date='"+newTransaction.spent_date+"', spent_balance="+newTransaction.spent_balance+" WHERE transaction_number ="+id+";";

    mysqlConnection.query(instrucQuery,(err,transaction)=>{
        console.log(transaction);
    })
};


transactionController.deleteTransaction=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    let instrucQuery="DELETE FROM transactions WHERE transaction_number="+id+";";

    mysqlConnection.query(instrucQuery,(err,users)=>{
        res.redirect('/');
    })
};

module.exports = transactionController;