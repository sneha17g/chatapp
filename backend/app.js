import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import  fileuploader from "express-fileupload"
import userrouter from "./router/userRouter.js";
import cors from "cors"
import Utiltiy from "./core/utility.js";
dotenv.config();
let PORT = process.env.PORT
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileuploader());
app.use(cors());

app.use(Utiltiy.jwtAuth);
app.use("/user",userrouter)

app.listen(PORT);
console.log(`server invoked at link http://localhost:${PORT}`);
