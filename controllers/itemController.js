//CLASE CONTROLADORA QUE ACCEDE A LA BASE DE DATOS
const Item = require('../models/item');
const itemController={};
const mysqlConnection = require('../database');

itemController.getItems=(req,res)=>{//LISTA LOS DATOS
    console.log(req.params);
    mysqlConnection.query('SELECT * FROM item;',(err,items)=>{
        if(err){
            res.json(err);
        }
        res.json(items);
    })

};

itemController.getEspecifyItem=(req,res)=>{//LISTA LOS DATOS
    console.log(req.params);
    mysqlConnection.query("SELECT * FROM item WHERE item_number="+req.params.id+";",(err,items)=>{
        if(err){
            res.json(err);
        }
        res.json(items);
    })
};



itemController.createItem=(req,res)=>{//LISTA LOS DATOS
    console.log(req.body);
    const item = new Item(req.body);
    console.log(item);
    res.json('recibido');
    

    let instrucQuery="INSERT INTO item VALUES (DEFAULT,"+item.budget_number+","+item.planned_balance+","+item.spent_balance+",'"+item.description+"');";

    mysqlConnection.query(instrucQuery,(err,users)=>{
        console.log(users);
    })
};

itemController.updateItem=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const newItem = req.body;
    console.log(newItem);

    let instrucQuery="UPDATE item SET budget_number="+newItem.budget_number+", planned_balance="+newItem.planned_balance+", spent_balance="+newItem.spent_balance+", description='"+newItem.description+"' WHERE item_number ="+id+";";

    mysqlConnection.query(instrucQuery,(err,users)=>{
        console.log(users);
    })
};

itemController.deleteItem=(req,res)=>{//LISTA LOS DATOS
    const id = req.params.id;
    console.log(req.params.id);
    let instrucQuery="DELETE FROM item WHERE item_number="+id+";";
    console.log(instrucQuery);
    mysqlConnection.query(instrucQuery,(err,users)=>{
         res.redirect('/');
     })
};

module.exports = itemController;