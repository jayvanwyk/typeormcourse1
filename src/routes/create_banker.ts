import express from 'express';
import { Banker } from '../entities/Banker';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.post('/api/banker', async (req, res) => {
  const { firstName, lastName, email, employeeNumber, cardNumber } = req.body;
  const banker = Banker.create({
    id: uuidv4(),
    first_name: firstName,
    last_name: lastName,
    email: email,
    employee_number: employeeNumber,
    card_number: cardNumber,
  });

  await banker.save();
  return res.json(banker);
});

export { router as createBankerRouter };
