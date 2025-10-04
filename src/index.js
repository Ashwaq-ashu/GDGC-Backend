import express from "express"
import cors from "cors"

const app = express();

// Enable JSON body parsing
app.use(express.json());
app.use(cors());

// Prisma Client (generated to ./generated/prisma in schema)
import { PrismaClient } from "../generated/prisma/index.js";
import { adminRouter } from "./routes/admin.js";
import { userRouter } from "./routes/user.js";
const prisma = new PrismaClient();

app.get('/',(req , res)=>{
    res.json({
        message : "Hello world"
    })
})

app.get('/applications', async (req, res) => {
    try {
        const applications = await prisma.application.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: applications });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})
 


app.use("api/v1/admin",adminRouter)
app.use("api/v1/user",userRouter)

// app.use(isAuthorized())


// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
