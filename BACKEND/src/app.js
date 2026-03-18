import express from "express";
import {createServer} from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";



const app = express();
const server = createServer(app);
const io = connectToSocket(server);



app.set("port",(process.env.PORT || 8000))  

app.set("trust proxy", 1);

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
});


app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes );


const start = async ()=>{
app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://sam_db_user:random123456@videocall.p65jtjg.mongodb.net/?appName=VideoCall");

    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=> {
        console.log("Listening on port 8000")
    });
}


start();