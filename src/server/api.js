import express from 'express';
import pkg from 'pg';
const { Client } = pkg;

export default (expressApp) => {
    expressApp.use(express.json());
    // Add custom endpoints here
    expressApp.get('/getTodoItems', (req, res, next) => {
        /*const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        client.connect();
    
        client.query(
            'SELECT id,task, due_on FROM todolist;',
            (err, data) => {
                if (err) console.log(err);
                res.json(data.rows);
                client.end();
            }
        );*/
        res.json([{id:1, "task":"some task 1"}])
    });

    expressApp.post('/insertTodoItem', (req, res, next) => {
        /*const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        client.connect();
        
        client.query(
            `INSERT INTO todolist(task) values('${req.body.task}');`,
            (err, data) => {
                if (err) res.json({"success": false});
                res.json({"success": true});
                client.end();
            }
        );*/
    });
    
    expressApp.post('/deleteTodoItem', (req, res, next) => {
        /*const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        client.connect();
        
        client.query(
            `DELETE FROM todolist where id='${req.body.id}';`,
            (err, data) => {
                if (err) res.json({"success": false});
                res.json({"success": true});
                client.end();
            }
        );*/
    });

};