import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()


const pool: mysql.Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_DBUSER,
  database: process.env.MYSQL_DBNAME,
  password: process.env.MYSQL_DBPASS
});

