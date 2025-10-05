import mongoose from "mongoose"

export const connectDb= async() =>{
    try{
        const con= await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to db",con.connection.host);

    }
    catch(err){
        console.log(error);
        process.exit(1);
        // status code 1 means fail 0 means success
    }
}