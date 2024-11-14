const express=require("express");
const mongoose=require("mongoose");
const router=require("./routes/user.routes")
const cookieParser=require("cookie-parser");
const cors=require("cors")
require('dotenv').config()

const app=express();
app.use(cors({credentials:true,origin:"http://localhost:3001"}));
app.use(cookieParser())
app.use(express.json());
app.use("/api",router)
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.a32vlxy.mongodb.net/Python?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(4000);
    console.log("Database is connected listeing to localhost 4000")
})
.catch((err)=>{
    console.log(err)
})


///sluJJfG2QsyoRp5C