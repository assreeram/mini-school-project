import mysql from 'mysql2/promise';


const db= mysql.createPool({
    host:'localhost',
    user: 'root',
    password: 'password',
    database: 'school_management'
});


export default db;