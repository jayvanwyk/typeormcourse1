import express from 'express';
import { Client } from '../entities/Client';
import {Transaction, TransactionTypes} from '../entities/Transaction';

const router = express.Router();

router.post('/api/client/:clientId/transaction', async (req, res) =>{
    const {clientId} = req.params;
    const {amount, type} = req.body;

    const client = (await Client.findOne(clientId)) as Client;

    if(!client){
        res.statusCode = 400;
        return res.json({
            msg: 'Client not found'
        });
    };

    const transaction = Transaction.create({
        amount: parseFloat(amount),
        transaction_type: type,
        client: client
    });

    await transaction.save();
    let clientBalance = client.balance;

    if(transaction.transaction_type === TransactionTypes.DEPOSIT){
        clientBalance = client.balance + transaction.amount;
    }else if(transaction.transaction_type === TransactionTypes.WITHDRAW){
        clientBalance = client.balance - transaction.amount;
    }
    client.balance = clientBalance;
    await client.save();
    return res.json({
        amount,
        type,
        balanceBefore: transaction.client.balance,
        newBalance: client.balance
    });
});

export {
    router as createTransactionRouter
}