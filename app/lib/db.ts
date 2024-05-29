import mysql from 'mysql2/promise';

export const db = mysql.createPool({
host: process.env.MYSQL_HOST,
port: Number(process.env.MYSQL_PORT),
database: process.env.MYSQL_DATABASE,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD
})
