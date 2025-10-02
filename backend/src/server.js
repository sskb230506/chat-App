import express from "express";
import dotenv from "dotenv";
import path from "path";
import authRoute from "./routes/auth.routes.js";

dotenv.config();
const port=process.env.PORT ||3000;



const app=express();
const __dirname=path.resolve();

app.use("/api/auth",authRoute);
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.use((_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
    })
}
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})