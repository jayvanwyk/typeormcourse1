import express, { json } from 'express';
import {Client} from '../entities/Client';
import {Banker} from '../entities/Banker';

const router = express.Router();

router.put('/api/banker/:bankerId/client/:clientId', async(req, res)=>{
    const {bankerId, clientId} = req.params;
    const client = await Client.findOne(clientId);
    const banker = await Banker.findOne(bankerId, {relations: ['clients']});

    console.log(banker);

    if(banker && client){
        banker.clients = [...banker.clients, client]
        await banker.save();
        console.log(banker);
        return res.json({
            msg: 'Banker connected to client'
        })
    }else{
        return res.json({
            msg: 'Banker or client not found'
        })
    }

    return res.json({msg: 'done'});
});

export {router as connectBankerToClientRouter};