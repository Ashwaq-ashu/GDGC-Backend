import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from root directory
dotenv.config({ path: path.join(__dirname, '../.env') });
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
import express from "express"
import cors from "cors"

import connectDB from "./mongodb/index.js";
const app = express();

// Enable JSON body parsing
app.use(express.json());
app.use(cors());

connectDB();


import { adminRouter } from "./routes/admin.js";
//import { userRouter } from "./routes/user.js";


app.get('/',(req , res)=>{
    res.json({
        message : "Hello world"
    })
})

app.get('/applications', async (req, res) => {
    res.json({
        message:"simple route for now"
    })
})
 


app.use("/api/v1/admin",adminRouter)
//app.use("/api/v1/user",userRouter)

// app.use(isAuthorized())


// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
