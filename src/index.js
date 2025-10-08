import express from "express"
import cors from "cors"
import dotenv from 'dotenv'
import connectDB from "./mongodb/index.js";
const app = express();

// Enable JSON body parsing
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();


import { adminRouter } from "./routes/admin.js";
import { userRouter } from "./routes/user.js";


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
 


app.use("api/v1/admin",adminRouter)
app.use("api/v1/user",userRouter)

// app.use(isAuthorized())


// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
