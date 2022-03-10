import { createConnection } from 'typeorm';

const main = async () =>{
    try {
        await createConnection({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'typeorm_user',
            password: 'password',
            database: 'typeormcourse'
        });
        console.log('Connected to DB');
    } catch (error) {
        console.log('Could not connect to DB.', error.message);
        throw new Error("Could not connect to DB");
    }
}

main();