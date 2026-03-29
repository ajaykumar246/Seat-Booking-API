import { Pool } from 'pg';

if (!process.env.DB_HOST) {
  throw new Error('DB_HOST is not defined in environment variables')
}
if (!process.env.DB_USER) {
  throw new Error('DB_USER is not defined in environment variables')
}
if (!process.env.DB_PASSWORD) {
  throw new Error('DB_PASSWORD is not defined in environment variables')
}
if (!process.env.DB_PORT) {
  throw new Error('DB_PORT is not defined in environment variables')
}
if (!process.env.DB_NAME) {
  throw new Error('DB_NAME is not defined in environment variables')
}
const PORT = parseInt(process.env.DB_PORT, 10);

if (isNaN(PORT)) {
  throw new Error("PORT must be a valid number");
}

const HOST:string=process.env.DB_HOST;
const USER:string=process.env.DB_USER;
const PASSWORD:string=process.env.DB_PASSWORD;
const DBNAME:string=process.env.DB_NAME;

const pool = new Pool({
  host:HOST,
  user:USER,
  password:PASSWORD,
  port:PORT,
  database:DBNAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

try{
const client = await pool.connect();
client.release();
console.log("DB connection SUCCESS");
}
catch(err){
    throw new Error("DB connection Fails");
}


export default pool;