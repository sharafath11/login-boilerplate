import "reflect-metadata";
import express from "express";
import "./core/di/container"; 
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/database";
import dotenv from "dotenv";
dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectDB()
app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
