import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb+srv://Wessal_Ayman:vxMHzgfbB7gNW525@cluster0.qv1hm.mongodb.net/E-Commerce-Backend").then(()=>{
    console.log("DB Connected Successfully");
}).catch((err)=>{
    console.log(`Error Connecting to DB ${err}`);
    
})