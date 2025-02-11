import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/E-Commerce-Backend").then(()=>{
    console.log("DB Connected Successfully");
}).catch((err)=>{
    console.log(`Error Connecting to DB ${err}`);
    
})