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

app.use(cors());

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










// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import userRoutes from "./routes/users.routes.js";

// const app = express();
// const PORT = process.env.PORT || 8000;

// // ✅ CORS for localhost:3000 → Render
// app.use(cors({
//     origin: [
//         "http://localhost:3000",
//         "https://real-meet-backend.onrender.co"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//     optionsSuccessStatus: 200
// }));

// app.use(express.json({ limit: "40kb" }));
// app.use(express.urlencoded({ limit: "40kb", extended: true }));

// app.use("/api/v1/users", userRoutes);

// const startServer = async () => {
//     try {
//         // Use env var on Render, fallback for local
//         const mongoURI = process.env.MONGODB_URI || 
//             "mongodb+srv://sam_db_user:random123456@videocall.p65jtjg.mongodb.net/?appName=VideoCall";
        
//         await mongoose.connect(mongoURI);
//         console.log("✅ MongoDB Connected");

//         app.listen(PORT, () => {
//             console.log(`🚀 Server listening on port ${PORT}`);
//             console.log(`📡 CORS enabled for http://localhost:3000`);
//         });
//     } catch (error) {
//         console.error("Startup error:", error);
//         process.exit(1);
//     }
// };

// startServer();