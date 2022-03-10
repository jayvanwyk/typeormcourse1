import express from 'express';
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
    balance: bal,
    id: uuidv4()
  });
  await client.save();
  return res.json(client);
});

export { router as createClientRouter };
