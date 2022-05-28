const express = require('express');
const getBankAccounts = require('./controllers/get-bank-accounts');
const createBankAccounts = require('./controllers/create-bank-accounts');
const updateUserBank = require('./controllers/update-user-bank');
const deleteBankAccount = require('./controllers/delete-bank-account');
const depositBankAccount = require('./controllers/deposit-bank-account');
const withdrawBankAccount = require('./controllers/withdraw-bank-account');
const transferBankAccounts = require('./controllers/transfer-bank-accounts');
const checkBalanceAccount = require('./controllers/check-balance-account');
const getBankStatement = require('./controllers/get-bank-statement');

const routes = express();

routes.get('/contas', getBankAccounts);
routes.post('/contas', createBankAccounts);
routes.put('/contas/:numeroConta/usuario', updateUserBank);
routes.delete('/contas/:numeroConta', deleteBankAccount);
routes.post('/transacoes/depositar', depositBankAccount);
routes.post('/transacoes/sacar', withdrawBankAccount);
routes.post('/transacoes/transferir', transferBankAccounts);
routes.get('/contas/saldo', checkBalanceAccount);
routes.get('/contas/extrato', getBankStatement);

module.exports = routes;