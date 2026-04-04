import bcrypt from 'bcrypt';

export async function hashPassword(password:string):Promise<string> {
    const hashed:string=await bcrypt.hash(password,10);
    return hashed;
}

export async function verifyPassword(hashedPassword:string,password:string):Promise<boolean> {
    const isMatch:boolean= await bcrypt.compare(password,hashedPassword);
    return isMatch;
}
