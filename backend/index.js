import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary'
import cors from 'cors';

import connectDB from './models/db.js';
import userRoutes from './routes/userRoutes.js';
import songRoutes from './routes/songRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";


cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
})


const app=express();
const port= process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL,   
  credentials: true                  
}));

app.use("/api/user",userRoutes);
app.use("/api/song",songRoutes);
app.use("/api/payment",paymentRoutes);

app.get("/",(req,res)=>{
  res.send("it is working");
})

connectDB().then(() => {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
})
.catch(err => console.error("DB connection failed:", err));