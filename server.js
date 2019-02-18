const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user');
const accountRoutes = require('./routes/account');
const transactionRoutes = require('./routes/transaction');
const budgetRoutes = require('./routes/budget');
const itemRoutes = require('./routes/item');

app.set('port', process.env.PORT || 3000);
app.use(cors({ origin: 'https://fas-uv.herokuapp.com/' }));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/items', itemRoutes);

app.listen(app.get('port'), () => {
    console.log(app.get('port'));
})









