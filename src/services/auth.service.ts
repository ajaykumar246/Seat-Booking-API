import {pool} from '../db/index.js';
import {hashPassword,verifyPassword} from '../utils/hash.js';
import {signToken} from '../utils/jwt.js';

export async function registerUser(name:string,email:string,password:string,role:string):Promise<void> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);
    if(result.rows.length>0){
        throw new Error("User already exists");
    }
    const hashedPassword:string=await hashPassword(password);
    await pool.query('INSERT INTO users(name,email,hashed_password,role) VALUES ($1,$2,$3,$4)',[name,email,hashedPassword,role]);

    
}

export async function loginUser(email:string,password:string):Promise<string> {
    const result= await pool.query('SELECT * FROM users WHERE email=$1',[email])
    if(result.rows.length==0){
        throw new Error("User not found");
    }

    const verify:boolean=await verifyPassword(password,result.rows[0].hashed_password);
    if(!verify) throw new Error("Invalid password");
    const token:string=signToken({
        id:result.rows[0].user_id,
        email:result.rows[0].email,
        role:result.rows[0].role,

    })
    return token;

}