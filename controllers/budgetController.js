//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Budget = require('../models/budget');
const budgetController={};
const mysqlConnection = require('../database');


budgetController.getBudgets=(req,res)=>{//LISTA LOS DATOS

    mysqlConnection.query('SELECT * FROM budget;',(err,budgets)=>{
        if(err){
            res.json(err);
        }
        res.json(budgets);
    })

};

budgetController.getEspecifyBudget=(req,res)=>{//LISTA LOS DATOS
    mysqlConnection.query("SELECT * FROM budget WHERE budget_number="+req.params.id+";",(err,budgets)=>{
        if(err){
            res.json(err);
        }
        res.json(budgets);
    })
};

budgetController.getBudgetByUser=(req,res)=>{//LISTA LOS DATOS
    mysqlConnection.query("SELECT * FROM budget WHERE identification='"+req.params.id+"';",(err,budgets)=>{
        if(err){
            res.json(err);
        }
        res.json(budgets);
    })
};


budgetController.createBudget=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const budget = new Budget(req.body);
    console.log(budget);
    res.json('recibido');
    
    let instrucQuery="INSERT INTO budget VALUES (DEFAULT,'"+budget.budget_name+"','"+budget.initial_date+"','"+budget.end_date+"',"+budget.identification+");";

    mysqlConnection.query(instrucQuery,(err,users)=>{
        console.log(users);
    })
};

budgetController.updateBudget=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newBudget = req.body;
    console.log(newBudget);

    let instrucQuery="UPDATE budget SET budget_name='"+newBudget.budget_name+"', initial_date='"+newBudget.initial_date+"', end_date='"+newBudget.end_date+"' WHERE budget_number ="+id+";";

    mysqlConnection.query(instrucQuery,(err,users)=>{
        console.log(users);
    })
};

budgetController.deleteBudget=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);

    let instrucQuery="DELETE FROM budget WHERE budget_number="+id+";";

    console.log(instrucQuery);

    mysqlConnection.query(instrucQuery,(err,users)=>{
         res.redirect('/');
     })
};

module.exports = budgetController;