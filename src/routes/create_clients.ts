import express, { json } from 'express';
import { Client } from '../entities/Client';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();

router.post('/api/client', async (req, res) => {
  const { firstName, lastName, email, cardNumber, bal } = req.body;

  const client = Client.create({
    first_name: firstName,
    last_name: lastName,
    email: email,
    card_number: cardNumber,
    balance: parseFloat(bal),
    id: uuidv4()
  });
  await client.save();
  return res.json(client);
});

router.get('/api/client', async(req, res)=>{
  const clients = await Client.find();
  console.log(clients);
  return res.json(clients);
});

router.get('/api/client/:clientId', async(req, res)=>{
  const {clientId} = req.params;
  const client = await Client.findOne(clientId);
  if(client){
    return res.json(client);
  }else{
    return res.json({msg:'Client not found'})
  }
});

router.delete('/api/client/:clientId', async(req, res)=>{
  const {clientId} = req.params;
  const result = await Client.delete(clientId);
  return res.json(result);
})

export { router as createClientRouter };
