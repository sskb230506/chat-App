import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.routes.js";

dotenv.config();
const port=process.env.PORT ||3000;



const app=express();
app.use("/api/auth",authRoute);
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})