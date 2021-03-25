import mysql from "mysql2";
import dotenv from "dotenv";
import { QueryArgs, QueryString } from "../typings";
dotenv.config()


const pool: mysql.Pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_DBUSER,
  database: process.env.MYSQL_DBNAME,
  password: process.env.MYSQL_DBPASS
});

/**
 * SQL wrapper
 */
export class SQL {
  /**
   * Async MYSQL query wrapper
   */
  static async query<T>(query: QueryString, args: QueryArgs): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      pool.query(query, args, (err: mysql.QueryError | null, result: mysql.RowDataPacket[]) => {
        if (err) { throw err; reject([])}
        resolve(result as T[])
        })
    })
}
}