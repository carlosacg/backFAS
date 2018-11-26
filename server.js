const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
//IMPORTING ROUTES


const userRoutes=require('./routes/user');
const accountRoutes=require('./routes/account');
const transactionRoutes=require('./routes/transaction');
const budgetRoutes=require('./routes/budget');
const itemRoutes=require('./routes/item');


//SETTINGS
app.set('port', process.env.PORT || 3000);


//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

//Static files
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));



//ROUTES
app.use('/api/users', userRoutes);  //PERMITE USAR LAS RUTAS DE LOS USUARIOS
app.use('/api/accounts', accountRoutes);  //PERMITE USAR LAS RUTAS DE LAS CUENTAS
app.use('/api/transactions', transactionRoutes);  //PERMITE USAR LAS RUTAS DE LAS TRANSACCIONES
app.use('/api/budgets', budgetRoutes);  //PERMITE USAR LAS RUTAS DE LOS PRESUPUESTOS
app.use('/api/items', itemRoutes);  //PERMITE USAR LAS RUTAS DE LOS ITEMS

//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'));
})









