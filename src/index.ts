import { createConnection } from 'typeorm';
import { Banker } from './entities/Banker';
import { Client } from './entities/Client';
import {Transaction} from './entities/Transaction';

import express from 'express';
import { createClientRouter } from './routes/create_clients';
import { createBankerRouter } from './routes/create_banker';

const app = express();

const main = async () =>{
    try {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'typeorm_user',
            password: 'password',
            database: 'typeormcourse',
            entities: [Client, Banker, Transaction],
            synchronize: true
        });
        console.log('Connected to DB');
        
        app.use(express.json());
        app.use(createClientRouter);
        app.use(createBankerRouter);


        app.listen(8080, () => {
            console.log('Now running on port 8080');
        });

    } catch (error) {
        console.log('Could not connect to DB.', error.message);
        throw new Error("Could not connect to DB");
    }
}

main();