import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
let url = process.env.url;
mongoose.connect(url)

console.log("db connect")