import "dotenv/config"
import http from "http";
import cors from "cors";
import router from "./router";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";



const app = express();
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({credentials: true}));
const server = http.createServer(app)

const port = process.env.PORT;
server.listen(port, () =>
{
    console.log(`Server running at http://localhost:${8080}`);
});

const dataBase = process.env.DB as string;
mongoose.Promise = Promise;
mongoose.connect(dataBase);
mongoose.connection.on('error', (error:Error) => console.log(error));
app.use('/', router());