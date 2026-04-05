import './utils/env.js';
import app from './app.js';
import {pool,connectDB} from './db/index.js';

//port
if (!process.env.PORT) {
  throw new Error('PORT is not defined in environment variables')
}
const PORT = parseInt(process.env.PORT, 10);
if (isNaN(PORT)) {
  throw new Error("PORT must be a valid number");
}
//db-connection
await connectDB();

app.listen(PORT,()=>{
    console.log(`App listening at ${PORT}`);
})