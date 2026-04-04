import jwt, {JwtPayload,SignOptions} from "jsonwebtoken";
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}
const secret:string = process.env.JWT_SECRET;
const expire = (process.env.JWT_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"];

export function signToken(payload:JwtPayload):string{
const jwt_token:string=jwt.sign(payload,secret,{expiresIn:expire});
return jwt_token;
}

export function verifyToken(token:string):JwtPayload{
try{
    const decoded=jwt.verify(token,secret);
    if(typeof decoded === "string"){
        throw new Error("payload is string");
    }
    const payload:JwtPayload=decoded;
    return payload;
}
catch(err){
    console.log("invalid token");
    throw new Error("Invalid or expired token");
}
}
