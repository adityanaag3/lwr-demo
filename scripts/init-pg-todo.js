import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Client } = pkg;
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
await client.connect();

const task = 'This is first task';

await client.query('CREATE TABLE todolist (id serial PRIMARY KEY,task VARCHAR ( 150 ),due_on TIMESTAMP);');
await client.query(`INSERT INTO todolist(task) values('${task}');`);
await client.end();

