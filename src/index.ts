import http from "http";
import cors from "cors";
import router from "router";
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
server.listen(8080, () =>
{
    console.log(`Server running at http://localhost:${8080}`);
});


mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://tal:HGVA5sJi4aP94aVs@cluster0.dorl5z3.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on('error', (error:Error) => console.log(error));
app.use('/', router());
